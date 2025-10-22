import Nav from "../Components/Nav";
import SupportNetwork from "../Components/SupportNetwork";

const Rede = () => (
  <div className="p-5 min-h-screen flex flex-col gap-7">
    <Nav />
    <main className="w-full max-w-2xl mx-auto flex flex-col gap-6 bg-white rounded-2xl shadow p-6">
      <h1 className="font-extrabold text-3xl md:text-4xl text-center text-[#064648] mb-4">
        Rede de Apoio
      </h1>
      <p className="text-center text-[#4B5563] text-base md:text-lg mb-4">
        Descubra como participar ou receber apoio através da rede de voluntários
        e parceiros da Associação Salvação.
      </p>
      <SupportNetwork />
    </main>
  </div>
);

export default Rede;
