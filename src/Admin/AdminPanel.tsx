import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{
    videos: any[];
    audios: any[];
    fotos: any[];
    livros: any[];
  }>({
    videos: [],
    audios: [],
    fotos: [],
    livros: [],
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    // Protege rota: só admin logado pode acessar
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/admin-login");
      return;
    }

    // Carrega arquivos
    loadFiles();
  }, [navigate]);

  async function loadFiles() {
    const types = ["videos", "audios", "fotos", "livros"];

    for (const type of types) {
      try {
        const res = await fetch(`${API_URL}/api/files/list/${type}`);
        const data = await res.json();
        setCategories((prev) => ({
          ...prev,
          [type]: data,
        }));
      } catch (err) {
        console.error(`Erro ao carregar ${type}:`, err);
      }
    }
  }

  async function handleUpload(type: string, file: File | null) {
    if (!file) {
      setError("Selecione um arquivo para enviar.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_URL}/api/files/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(`${type} enviado com sucesso!`);
        loadFiles();

        // Limpar input
        if (type === "videos") setVideoFile(null);
        if (type === "audios") setAudioFile(null);
        if (type === "fotos") setPhotoFile(null);
        if (type === "livros") setBookFile(null);
      } else {
        setError(data.error || "Erro ao enviar arquivo.");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor: " + err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number, type: string) {
    if (!confirm("Tem certeza que deseja deletar?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_URL}/api/files/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setSuccess("Arquivo deletado com sucesso!");
        loadFiles();
      } else {
        setError("Erro ao deletar arquivo.");
      }
    } catch (err) {
      setError("Erro de conexão: " + err);
    }
  }

  return (
    <div className="p-5 min-h-screen flex flex-col gap-7 items-center bg-[#F6FFF8]">
      <Nav />
      <main className="w-full max-w-2xl mx-auto flex flex-col gap-8 bg-white rounded-2xl shadow-xl p-8 items-center md:p-10 lg:p-12">
        <h1 className="font-extrabold text-3xl md:text-4xl text-center text-[#064648] mb-4">
          Painel do Administrador
        </h1>

        {error && (
          <div className="w-full bg-red-100 text-red-700 p-3 rounded-lg font-semibold">
            {error}
          </div>
        )}
        {success && (
          <div className="w-full bg-green-100 text-green-700 p-3 rounded-lg font-semibold">
            {success}
          </div>
        )}

        <div className="w-full flex flex-col gap-8">
          {/* Vídeos */}
          <section className="flex flex-col gap-3">
            <h2 className="font-bold text-lg text-[#064648]">Vídeos</h2>
            <div className="flex gap-2 items-center">
              <input
                type="file"
                accept="video/mp4,video/webm,video/ogg"
                className="border rounded-lg p-2 w-full"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                disabled={loading}
              />
              <button
                className="bg-[#064648] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#0a6c6c] disabled:opacity-50"
                onClick={() => handleUpload("videos", videoFile)}
                disabled={loading}
              >
                {loading ? "..." : "Enviar"}
              </button>
            </div>
            <ul className="flex flex-wrap gap-2 mt-2">
              {categories.videos.map((file) => (
                <li
                  key={file.id}
                  className="bg-[#C4F1CD] text-[#064648] px-3 py-1 rounded-full text-xs font-semibold shadow flex gap-2 items-center"
                >
                  {file.filename}
                  <button
                    onClick={() => handleDelete(file.id, "videos")}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Áudios */}
          <section className="flex flex-col gap-3">
            <h2 className="font-bold text-lg text-[#064648]">Áudios</h2>
            <div className="flex gap-2 items-center">
              <input
                type="file"
                accept="audio/mp3,audio/wav,audio/ogg"
                className="border rounded-lg p-2 w-full"
                onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                disabled={loading}
              />
              <button
                className="bg-[#064648] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#0a6c6c] disabled:opacity-50"
                onClick={() => handleUpload("audios", audioFile)}
                disabled={loading}
              >
                {loading ? "..." : "Enviar"}
              </button>
            </div>
            <ul className="flex flex-wrap gap-2 mt-2">
              {categories.audios.map((file) => (
                <li
                  key={file.id}
                  className="bg-[#C4F1CD] text-[#064648] px-3 py-1 rounded-full text-xs font-semibold shadow flex gap-2 items-center"
                >
                  {file.filename}
                  <button
                    onClick={() => handleDelete(file.id, "audios")}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Fotos */}
          <section className="flex flex-col gap-3">
            <h2 className="font-bold text-lg text-[#064648]">Fotos</h2>
            <div className="flex gap-2 items-center">
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                className="border rounded-lg p-2 w-full"
                onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                disabled={loading}
              />
              <button
                className="bg-[#064648] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#0a6c6c] disabled:opacity-50"
                onClick={() => handleUpload("fotos", photoFile)}
                disabled={loading}
              >
                {loading ? "..." : "Enviar"}
              </button>
            </div>
            <ul className="flex flex-wrap gap-2 mt-2">
              {categories.fotos.map((file) => (
                <li
                  key={file.id}
                  className="bg-[#C4F1CD] text-[#064648] px-3 py-1 rounded-full text-xs font-semibold shadow flex gap-2 items-center"
                >
                  {file.filename}
                  <button
                    onClick={() => handleDelete(file.id, "fotos")}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Livros */}
          <section className="flex flex-col gap-3">
            <h2 className="font-bold text-lg text-[#064648]">Livros</h2>
            <div className="flex gap-2 items-center">
              <input
                type="file"
                accept="application/pdf"
                className="border rounded-lg p-2 w-full"
                onChange={(e) => setBookFile(e.target.files?.[0] || null)}
                disabled={loading}
              />
              <button
                className="bg-[#064648] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#0a6c6c] disabled:opacity-50"
                onClick={() => handleUpload("livros", bookFile)}
                disabled={loading}
              >
                {loading ? "..." : "Enviar"}
              </button>
            </div>
            <ul className="flex flex-wrap gap-2 mt-2">
              {categories.livros.map((file) => (
                <li
                  key={file.id}
                  className="bg-[#C4F1CD] text-[#064648] px-3 py-1 rounded-full text-xs font-semibold shadow flex gap-2 items-center"
                >
                  {file.filename}
                  <button
                    onClick={() => handleDelete(file.id, "livros")}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
