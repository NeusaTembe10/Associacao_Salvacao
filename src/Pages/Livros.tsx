import Nav from "../Components/Nav";
import Search from "../Components/Search";
import { useState } from "react";

const livrosData = [
  { id: 1, nome: "Bíblia Sagrada" },
  { id: 2, nome: "Salmos e Provérbios" },
  { id: 3, nome: "Evangelho de João" },
  { id: 4, nome: "Atos dos Apóstolos" },
  { id: 5, nome: "Cartas de Paulo" },
];

const Livros = () => {
  const [search, setSearch] = useState("");
  const [livros, setLivros] = useState(livrosData);

  const filtrarLivros = (valor: string) => {
    const termo = valor.trim().toLowerCase();
    if (termo === "") {
      setLivros(livrosData);
    } else {
      setLivros(livrosData.filter((l) => l.nome.toLowerCase().includes(termo)));
    }
  };

  return (
    <div className="p-5 flex flex-col gap-7 min-h-screen">
      <Nav />
      <main className="w-full max-w-2xl mx-auto flex flex-col gap-6 bg-white rounded-2xl shadow p-6">
        <h1 className="font-extrabold text-3xl md:text-4xl text-center text-[#064648] mb-4">
          Livros
        </h1>
        <p className="text-center text-[#4B5563] text-base md:text-lg mb-4">
          Aqui você encontra os livros disponíveis para a comunidade da igreja.
        </p>
        <Search
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            filtrarLivros(e.target.value);
          }}
          onSearch={filtrarLivros}
        />
        <ul className="mt-4 flex flex-col gap-2">
          {livros.length === 0 ? (
            <li className="text-center text-gray-400">
              Nenhum livro encontrado.
            </li>
          ) : (
            livros.map((livro) => (
              <li
                key={livro.id}
                className="border rounded-lg p-2 text-[#064648] bg-[#F6FFF8]"
              >
                {livro.nome}
              </li>
            ))
          )}
        </ul>
      </main>
    </div>
  );
};

export default Livros;
