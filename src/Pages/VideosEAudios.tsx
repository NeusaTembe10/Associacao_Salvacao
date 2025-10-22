import Nav from "../Components/Nav";

const VideosEAudios = () => {
  return (
    <div className="p-5 flex flex-col gap-7 min-h-screen">
      <Nav />
      <main className="w-full max-w-2xl mx-auto flex flex-col gap-6 bg-white rounded-2xl shadow p-6">
        <h1 className="font-extrabold text-3xl md:text-4xl text-center text-[#064648] mb-4">
          Vídeos e Áudios
        </h1>
        <p className="text-center text-[#4B5563] text-base md:text-lg mb-4">
          Assista e ouça pregações, louvores e outros conteúdos em vídeo e
          áudio.
        </p>
        {/* Lista de vídeos e áudios */}
      </main>
    </div>
  );
};

export default VideosEAudios;
