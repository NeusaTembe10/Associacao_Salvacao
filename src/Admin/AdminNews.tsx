import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface News {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
}

export default function AdminNews() {
  const navigate = useNavigate();
  const [news, setNews] = useState<News[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
      return;
    }
    fetchNews();
  }, [token, navigate]);

  async function fetchNews() {
    try {
      const res = await fetch(`${API_URL}/api/news`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNews(data);
    } catch (err) {
      console.error("Erro ao buscar notícias:", err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API_URL}/api/news/${editId}`
      : `${API_URL}/api/news`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          author: localStorage.getItem("adminName"),
        }),
      });

      if (res.ok) {
        setTitle("");
        setContent("");
        setEditId(null);
        fetchNews();
        alert(editId ? "Notícia atualizada!" : "Notícia criada!");
      } else {
        alert("Erro ao salvar notícia");
      }
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Tem certeza que deseja deletar?")) return;

    try {
      const res = await fetch(`${API_URL}/api/news/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchNews();
        alert("Notícia deletada!");
      }
    } catch (err) {
      console.error("Erro:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#064648] mb-8">
          Gerenciar Notícias
        </h1>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg mb-8"
        >
          <input
            type="text"
            placeholder="Título da notícia"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          />
          <textarea
            placeholder="Conteúdo da notícia"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 h-40"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#064648] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#0a6c6c] disabled:opacity-50"
          >
            {loading ? "Salvando..." : editId ? "Atualizar" : "Criar"}
          </button>
        </form>

        {/* Lista de Notícias */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#064648] text-white">
              <tr>
                <th className="p-4 text-left">Título</th>
                <th className="p-4 text-left">Autor</th>
                <th className="p-4 text-left">Data</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{item.title}</td>
                  <td className="p-4">{item.author}</td>
                  <td className="p-4">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center gap-2 flex justify-center">
                    <button
                      onClick={() => {
                        setEditId(item.id);
                        setTitle(item.title);
                        setContent(item.content);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
