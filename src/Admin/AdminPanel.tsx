import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se admin está logado
    const isAdmin = localStorage.getItem("isAdmin");
    const token = localStorage.getItem("adminToken");
    const name = localStorage.getItem("adminName");

    if (!isAdmin || !token) {
      navigate("/admin-login");
      return;
    }

    setAdminName(name || "Admin");
    setLoading(false);
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminName");
    localStorage.removeItem("userType");
    navigate("/admin-login");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#064648] text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        <div className="flex gap-4 items-center">
          <span>
            Bem-vindo, <strong>{adminName}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-bold"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card: Gerenciar Notícias */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
            onClick={() => navigate("/admin/noticias")}
          >
            <h2 className="text-xl font-bold text-[#064648] mb-2">
              📰 Notícias
            </h2>
            <p className="text-gray-600">Criar, editar e deletar notícias</p>
          </div>

          {/* Card: Gerenciar Usuários */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
            onClick={() => navigate("/admin/usuarios")}
          >
            <h2 className="text-xl font-bold text-[#064648] mb-2">
              👥 Usuários
            </h2>
            <p className="text-gray-600">Gerenciar usuários cadastrados</p>
          </div>

          {/* Card: Gerenciar Eventos */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
            onClick={() => navigate("/admin/eventos")}
          >
            <h2 className="text-xl font-bold text-[#064648] mb-2">
              📅 Eventos
            </h2>
            <p className="text-gray-600">Criar e gerenciar eventos</p>
          </div>

          {/* Card: Configurações */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
            onClick={() => navigate("/admin/configuracoes")}
          >
            <h2 className="text-xl font-bold text-[#064648] mb-2">
              ⚙️ Configurações
            </h2>
            <p className="text-gray-600">Alterar dados da chiesa</p>
          </div>
        </div>

        {/* Informações */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-[#064648] mb-4">
            ℹ️ Informações
          </h2>
          <p className="text-gray-700">
            Bem-vindo ao painel administrativo! Aqui você pode gerenciar todo o
            conteúdo da aplicação.
          </p>
        </div>
      </main>
    </div>
  );
}
