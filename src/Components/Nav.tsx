import { useState, useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { RiHome6Line } from "react-icons/ri";

export default function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  // Fecha o menu ao clicar fora (opcional)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <nav className="flex flex-col gap-5 w-full">
      <section className="flex items-center gap-5">
        <a href="/home">
          <img
            src="/src/assets/Logo/Chearche.jpg"
            alt="Logo da igreja"
            className="w-20 rounded-[50px] opacity-[80%]"
          />
        </a>
        <h1 className="font-bold">Associação Salvação</h1>
      </section>
      <div className="relative bg-[#064648] opacity-[80%] p-3 text-white flex gap-1 md:gap-10">
        <button
          className="flex items-center gap-2 cursor-pointer justify-center"
          onClick={() => (window.location.href = "/home")}
        >
          <RiHome6Line className="w-6 h-6" />
          Home
        </button>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <FaAngleDown className="w-6 h-6" />
          Menu
        </button>

        <button
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => (window.location.href = "/help")}
        >
          <IoMdHelpCircleOutline className="w-6 h-6" />
          Ajuda
        </button>
        <button
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => (window.location.href = "/about")}
        >
          <FcAbout className="w-6 h-6" />
          Sobre
        </button>
        {showMenu && (
          <ul
            ref={menuRef}
            className="absolute top-full left-0 mt-2 bg-[#0b7676] rounded shadow-lg w-40 z-50"
          >
            <li
              className="p-3 hover:bg-[#145959] cursor-pointer"
              onClick={() => (window.location.href = "/cruzadas")}
            >
              Cruzadas
            </li>
            <li
              className="p-3 hover:bg-[#145959] cursor-pointer"
              onClick={() => (window.location.href = "/missao")}
            >
              Missões
            </li>
            <li
              className="p-3 hover:bg-[#145959] cursor-pointer"
              onClick={() => (window.location.href = "/rede")}
            >
              Rede de apoio
            </li>
            <li
              className="p-3 hover:bg-[#145959] cursor-pointer"
              onClick={() => (window.location.href = "/perfil")}
            >
              Meu perfil
            </li>
            {(() => {
              // Verificação robusta para admin
              const isAdmin =
                localStorage.getItem("isAdmin") === "true" &&
                localStorage.getItem("userType") === "admin";
              return isAdmin ? (
                <li
                  className="p-3 hover:bg-[#145959] cursor-pointer font-bol"
                  onClick={() => (window.location.href = "/admin-panel")}
                >
                  Painel do Administrador
                </li>
              ) : null;
            })()}
          </ul>
        )}
      </div>
    </nav>
  );
}
