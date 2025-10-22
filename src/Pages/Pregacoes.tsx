import Nav from "../Components/Nav";
import YouTubeList from "../Components/YoutubeList";
const Pregacoes = () => {
  return (
    <div className="p-5 flex flex-col gap-7 min-h-screen">
      <Nav />
      <main className="w-full max-w-2xl mx-auto flex flex-col gap-6 bg-white rounded-2xl shadow p-6">
        <h1 className="font-extrabold text-3xl md:text-4xl text-center text-[#064648] mb-4">
          Pregações
        </h1>
        <p className="text-center text-[#4B5563] text-base md:text-lg mb-4">
          Confira pregações e mensagens para edificação espiritual.
        </p>
        {/* Lista de pregações do canal do YouTube */}
        <div className="flex flex-col items-center">
          <YouTubeList apiKey="AIzaSyDWSlYzRF_D6_lLJUOI1FwRLmR06JoKzYw" channelId="UCn-0nH1jIzhI3PIgABimrXA" maxResults={10} />
        </div>
      </main>
    </div>
  );
};

export default Pregacoes;
