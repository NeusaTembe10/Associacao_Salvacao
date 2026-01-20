import CategoryList from "../Components/CategoryList";
import Nav from "../Components/Nav";
import Search from "../Components/Search";
import { IoFilter } from "react-icons/io5";
import WordOfDay from "../Components/WordOfDay";
import { useState, useEffect } from "react";

const categoryTypes = [
  { label: "Todos", value: "all" },
  { label: "Fotos", value: "Fotos" },
  { label: "Videos e audios", value: "Videos e audios" },
  { label: "Pregações", value: "Pregações" },
  { label: "Biblioteca", value: "Biblioteca" },
];

const Home = ({
  showToast,
}: {
  showToast?: (msg: string, type?: "success" | "error" | "info") => void;
}) => {
  const [filter, setFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [hasNew, setHasNew] = useState(false);
  const [newContent, setNewContent] = useState("");

  //verificacao do login 
if (!localStorage.getItem("token")) {
  window.location.href = "/login"; // Redireciona para a página de login
}

  useEffect(() => {
    // Simulação: checa se há algo novo (pode ser substituído por chamada à API)
    const novo = localStorage.getItem("hasNewContent");
    const conteudo = localStorage.getItem("newContentText");
    if (novo === "true" && conteudo) {
      setHasNew(true);
      setNewContent(conteudo);
    } else {
      setHasNew(false);
    }
  }, [showToast]);

  const handleFilterClick = () => {
    setShowFilter((prev) => !prev);
  };

  // Busca rápida: filtra ao pressionar Enter ou ao digitar
  const handleSearch = (valor: string) => {
    setFilter(valor.trim() === "" ? "all" : valor);
  };

  const handleSeeNew = () => {
    // Exemplo: direciona para página de novidades
    window.location.href = "/novidade";
    setHasNew(false);
    localStorage.setItem("hasNewContent", "false");
  };

  return (
    <div className="p-6 flex flex-col gap-7">
      <Nav />
      {hasNew && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] bg-[#064648] text-white px-6 py-4 rounded-xl shadow-lg flex flex-col items-center gap-2 animate-fadeIn">
          <span className="font-semibold">{newContent}</span>
          <button
            className="bg-[#A0E7B6] text-[#064648] px-4 py-1 rounded-lg font-bold shadow hover:bg-[#A0E7B6] transition"
            onClick={handleSeeNew}
          >
            Ver novidade
          </button>
        </div>
      )}
      <Search
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setFilter(e.target.value.trim() === "" ? "all" : e.target.value);
        }}
        onSearch={handleSearch}
      />
      <section className="flex justify-between items-center relative">
        <h1 className="font-bold text-[20px]">Categorias</h1>
        <div className="relative">
          <button
            className="flex items-center gap-2 text-[#4B5563] hover:text-[#064648] transition"
            onClick={handleFilterClick}
          >
            <IoFilter className="h-6 w-6 cursor-pointer" />
          </button>
          {showFilter && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[150px]">
              {categoryTypes.map((cat) => (
                <button
                  key={cat.value}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 text-[#064648] ${
                    filter === cat.value ? "font-bold bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setFilter(cat.value);
                    setSearch("");
                    setShowFilter(false);
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
      <div id="category-list-section">
        <CategoryList filter={filter} />
      </div>
      <WordOfDay />
    </div>
  );
};
export default Home;
