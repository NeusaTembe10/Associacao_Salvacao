import Nav from "../Components/Nav";
import Search from "../Components/Search";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="p-5 flex flex-col gap-7">
      <Nav />
      <Search />
      <main className="w-full max-w-2xl mx-auto flex flex-col gap-6 bg-white rounded-2xl shadow p-6">
        <h1 className="font-extrabold text-3xl md:text-4xl text-center text-[#064648] mb-4">
          Ajuda
        </h1>
        <p className="text-center text-[#4B5563] text-base md:text-lg mb-4">
          Encontre respostas para dúvidas frequentes, tutoriais e informações de
          contato para suporte.
        </p>
        <ul className="list-disc pl-6 text-[#064648] text-base md:text-lg space-y-2">
          <Link to="/help/create-account" className="hover:underline"><li >Como criar uma conta?</li> </Link>
          <Link to="/help/content-categories" className="hover:underline"><li>Como acessar as categorias de conteúdo?</li></Link>
          <li>Como redefinir minha senha?</li>
          <li>Como entrar em contato com o suporte?</li>
        </ul>
        <div className="mt-6 text-center">
          <span className="font-semibold">Precisa de mais ajuda?</span>
          <br />
          <a
            href="mailto:suporte@associacaosalvacao.com"
            className="text-[#0588b8] font-semibold hover:underline"
          >
            suporte@associacaosalvacao.com
          </a>
        </div>
      </main>
    </div>
  );
};

export default Help;
