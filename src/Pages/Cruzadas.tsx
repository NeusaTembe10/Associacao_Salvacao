import Nav from "../Components/Nav";
import YouTubeList from "../Components/YoutubeList";

const Cruzadas = () => (
  <div className="p-5 min-h-screen flex flex-col gap-7">
    <Nav />
    <main className="w-full max-w-2xl mx-auto flex flex-col gap-6 bg-white rounded-2xl shadow p-6">
        <h1 className="font-extrabold text-3xl md:text-4xl text-center text-[#064648] mb-4">
          Cruzadas
        </h1>
        <p className="text-center text-[#4B5563] text-base md:text-lg mb-4">
          Confira trechos das cruzadas e mensagens para edificação espiritual.
        </p>
        {/* Lista de pregações do canal do YouTube */}
        <div className=" flex flex-col items-center">
          <YouTubeList apiKey="AIzaSyDWSlYzRF_D6_lLJUOI1FwRLmR06JoKzYw" channelId="UCn-0nH1jIzhI3PIgABimrXA" maxResults={10} tituloFiltro="cruzada"  />
        </div>
      </main>
  </div>
);

export default Cruzadas;
