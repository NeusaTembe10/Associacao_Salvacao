import Nav from "../Components/Nav";
const About = () => {
  return (
    <div className="p-5 flex flex-col gap-7 min-h-screen">
      <Nav />
      <main className="w-full max-w-2xl mx-auto flex flex-col gap-6 bg-white rounded-2xl shadow p-6">
        <h1 className="font-extrabold text-3xl md:text-4xl text-center text-[#064648] mb-4">
          Sobre
        </h1>
        <p className="text-center text-[#4B5563] text-base md:text-lg mb-4">
          O aplicativo{" "}
          <span className="font-bold text-[#064648]">Associação Salvação</span>{" "}
          foi criado para apoiar a comunidade da igreja, promovendo comunicação,
          crescimento espiritual e acesso facilitado a conteúdos como livros,
          fotos, vídeos e pregações.
        </p>
        <ul className="list-disc pl-6 text-[#064648] text-base md:text-lg space-y-2">
          <li>Missão: Fortalecer a fé e a união dos membros.</li>
          <li>Visão: Ser referência em tecnologia para apoio espiritual.</li>
          <li>Valores: Amor, comunhão, transparência e serviço.</li>
        </ul>
        <div className="mt-6 text-center">
          <span className="font-semibold">Desenvolvido por:</span>
          <br />
          <span className="text-[#0588b8] font-semibold">
            Equipe Associação Salvação
          </span>
        </div>
      </main>
    </div>
  );
};

export default About;
