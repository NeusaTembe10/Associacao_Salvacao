import { useEffect, useState } from "react";
import Nav from "../Components/Nav";

export default function AdminPanel() {
  // Função para upload de arquivo
  async function handleUpload(type: string, file: File | null) {
    if (!file) {
      setError("Selecione um arquivo para enviar.");
      return;
    }
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    try {
      const res = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setCategories((prev) => ({
          ...prev,
          [type]: [...prev[type as keyof typeof prev], data.filename],
        }));
        setError("");
      } else {
        setError(data.error || "Erro ao enviar arquivo.");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor." + err);
    }
  }
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<{
    videos: string[];
    audios: string[];
    fotos: string[];
    livros: string[];
  }>({
    videos: [],
    audios: [],
    fotos: [],
    livros: [],
  });

  useEffect(() => {
    // Protege rota: só admin logado pode acessar
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin-login";
    }
  }, []);

  // Função antiga de categoria removida (não utilizada)

  return (
    <div className="p-5 min-h-screen flex flex-col gap-7 items-center bg-[#F6FFF8]">
      <Nav />
      <main className="w-full max-w-2xl mx-auto flex flex-col gap-8 bg-white rounded-2xl shadow-xl p-8 items-center md:p-10 lg:p-12">
        <div className="w-full flex justify-end mb-2"></div>
        <h1 className="font-extrabold text-3xl md:text-4xl text-center text-[#064648] mb-4">
          Painel do Administrador
        </h1>
        {error && (
          <div className="text-red-600 font-semibold mb-2">{error}</div>
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
                onChange={(e) => {
                  setError("");
                  const file = e.target.files?.[0];
                  if (file && !file.type.startsWith("video/")) {
                    setError("Selecione apenas arquivos de vídeo.");
                    setVideoFile(null);
                  } else {
                    setVideoFile(file || null);
                  }
                }}
              />
              <button
                className="bg-[#064648] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#0a6c6c]"
                onClick={async () => {
                  await handleUpload("videos", videoFile);
                  setVideoFile(null);
                }}
              >
                Enviar
              </button>
            </div>
            <ul className="flex flex-wrap gap-2 mt-2">
              {categories.videos.map((cat, idx) => (
                <li
                  key={idx}
                  className="bg-[#C4F1CD] text-[#064648] px-3 py-1 rounded-full text-xs font-semibold shadow"
                >
                  {cat}
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
                onChange={(e) => {
                  setError("");
                  const file = e.target.files?.[0];
                  if (file && !file.type.startsWith("audio/")) {
                    setError("Selecione apenas arquivos de áudio.");
                    setAudioFile(null);
                  } else {
                    setAudioFile(file || null);
                  }
                }}
              />
              <button
                className="bg-[#064648] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#0a6c6c]"
                onClick={async () => {
                  await handleUpload("audios", audioFile);
                  setAudioFile(null);
                }}
              >
                Enviar
              </button>
            </div>
            <ul className="flex flex-wrap gap-2 mt-2">
              {categories.audios.map((cat, idx) => (
                <li
                  key={idx}
                  className="bg-[#C4F1CD] text-[#064648] px-3 py-1 rounded-full text-xs font-semibold shadow"
                >
                  {cat}
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
                onChange={(e) => {
                  setError("");
                  const file = e.target.files?.[0];
                  if (file && !file.type.startsWith("image/")) {
                    setError("Selecione apenas arquivos de imagem.");
                    setPhotoFile(null);
                  } else {
                    setPhotoFile(file || null);
                  }
                }}
              />
              <button
                className="bg-[#064648] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#0a6c6c]"
                onClick={async () => {
                  await handleUpload("fotos", photoFile);
                  setPhotoFile(null);
                }}
              >
                Enviar
              </button>
            </div>
            <ul className="flex flex-wrap gap-2 mt-2">
              {categories.fotos.map((cat, idx) => (
                <li
                  key={idx}
                  className="bg-[#C4F1CD] text-[#064648] px-3 py-1 rounded-full text-xs font-semibold shadow"
                >
                  {cat}
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
                onChange={(e) => {
                  setError("");
                  const file = e.target.files?.[0];
                  if (file && file.type !== "application/pdf") {
                    setError("Selecione apenas arquivos PDF.");
                    setBookFile(null);
                  } else {
                    setBookFile(file || null);
                  }
                }}
              />
              <button
                className="bg-[#064648] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#0a6c6c]"
                onClick={async () => {
                  await handleUpload("livros", bookFile);
                  setBookFile(null);
                }}
              >
                Enviar
              </button>
            </div>
            <ul className="flex flex-wrap gap-2 mt-2">
              {categories.livros.map((cat, idx) => (
                <li
                  key={idx}
                  className="bg-[#C4F1CD] text-[#064648] px-3 py-1 rounded-full text-xs font-semibold shadow"
                >
                  {cat}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
