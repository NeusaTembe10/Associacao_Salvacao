import React, { useEffect, useState } from "react";

interface YouTubeListProps {
  apiKey: string;
  channelId?: string;
  playlistId?: string;
  maxResults?: number;
  tituloFiltro?: string; // nova prop opcional
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

const YouTubeList: React.FC<YouTubeListProps> = ({
  apiKey ,
  channelId,
  playlistId,
  maxResults = 8,
  tituloFiltro,
}) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
  async function fetchVideos() {
    setLoading(true);
    setError("");
    try {
      let url = "";
      if (playlistId) {
        url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`;
      } else if (channelId) {
        url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;
      } else {
        url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet,id&order=date&maxResults=${maxResults}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      let items: Video[] = [];

      if (playlistId && data.items) {
        items = (data.items as any[])
          .filter(
            (item) =>
              item.snippet &&
              item.snippet.resourceId &&
              item.snippet.resourceId.videoId
          )
          .map((item) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
          }));
      } else if (data.items) {
        items = (data.items as any[])
          .filter(
            (item) =>
              item.id && item.id.kind === "youtube#video" && item.id.videoId
          )
          .map((item) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          }));
      }

      // Filtra vídeos pelo título, se a prop tituloFiltro estiver definida
      if (tituloFiltro) {
  items = items.filter((video) =>
    video.title.toLowerCase().includes(tituloFiltro.toLowerCase())
  );
}

      setVideos(items);
    } catch (e) {
      setError("Erro ao buscar vídeos do YouTube.");
    }
    setLoading(false);
  }
  fetchVideos();
}, [apiKey, channelId, playlistId, maxResults, tituloFiltro]);

  if (loading) return <div>Carregando vídeos...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  if (!videos.length) {
    return <div className="text-center text-gray-500">Nenhum vídeo encontrado.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full my-6">
      {videos.map((video) => (
        <div key={video.id} className="w-full flex flex-col items-center">
          <div className="w-full aspect-video rounded-lg overflow-hidden mb-2">
            <iframe
              width="100%"
              height="220"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <span className="text-[#064648] font-semibold text-center text-sm line-clamp-2">
            {video.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default YouTubeList;
