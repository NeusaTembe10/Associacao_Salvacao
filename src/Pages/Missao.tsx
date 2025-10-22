import Nav from "../Components/Nav";

const Missao = () => (
  <div className="p-5 min-h-screen flex flex-col gap-7">
    <Nav />
    <main className="w-full max-w-2xl mx-auto flex flex-col gap-6 bg-white rounded-2xl shadow p-6">
      <h1 className="font-extrabold text-3xl md:text-4xl text-center text-[#064648] mb-4">
        Missões
      </h1>
      <p className="text-center text-[#4B5563] text-base md:text-lg mb-4">
        Conheça os projetos missionários, parcerias e oportunidades de servir
        junto à Associação Salvação.
      </p>
    </main>
  </div>
);

export default Missao;
