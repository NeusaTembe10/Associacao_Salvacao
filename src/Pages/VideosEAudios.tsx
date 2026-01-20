import { useEffect, useState } from "react";
import Nav from "../Components/Nav";

interface Video {
  id: number;
  filename: string;
  url: string;
  created_at: string;
}

const VideosEAudios = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [audios, setAudios] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    try {
      setLoading(true);

      // Carregar vídeos
      const videosRes = await fetch(`${API_URL}/api/files/list/videos`);
      const videosData = await videosRes.json();
      if (Array.isArray(videosData)) {
        setVideos(videosData);
      }

      // Carregar áudios
      const audiosRes = await fetch(`${API_URL}/api/files/list/audios`);
      const audiosData = await audiosRes.json();
      if (Array.isArray(audiosData)) {
        setAudios(audiosData);
      }

      setError("");
    } catch (err) {
      setError("Erro ao carregar conteúdo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg text-[#064648]">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-2xl mx-auto flex flex-col gap-6 bg-white rounded-2xl shadow p-6">
      <Nav />

      <main className="p-5 max-w-6xl mx-auto flex flex-col gap-6 items-center justify-center">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-5 font-semibold">
            {error}
          </div>
        )}

        {/* Vídeos */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#064648] mb-6">Vídeos</h2>
          {videos.length === 0 ? (
            <p className="text-gray-600">Nenhum vídeo disponível.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <video
                    src={`${API_URL}${video.url}`}
                    controls
                    className="w-full h-64 object-cover bg-black"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-[#064648] truncate">
                      {video.filename}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {new Date(video.created_at).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Áudios */}
        <section>
          <h2 className="text-3xl font-bold text-[#064648] mb-6">Áudios</h2>
          {audios.length === 0 ? (
            <p className="text-gray-600">Nenhum áudio disponível.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {audios.map((audio) => (
                <div
                  key={audio.id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
                >
                  <audio
                    src={`${API_URL}${audio.url}`}
                    controls
                    className="w-full mb-3"
                  />
                  <h3 className="font-bold text-[#064648] truncate">
                    {audio.filename}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {new Date(audio.created_at).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default VideosEAudios;
