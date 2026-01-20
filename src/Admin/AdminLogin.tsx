import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Components/Input";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("Tentando login com:", { username, password });
    console.log("API_URL:", API_URL);

    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log("Resposta do servidor:", data);

      if (!res.ok) {
        setError(data.error || "Erro ao autenticar.");
        setLoading(false);
        return;
      }

      if (data.success && data.token) {
        // Salva dados do admin logado
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminId", String(data.id));
        localStorage.setItem("adminName", data.username);
        localStorage.setItem("userType", data.type);

        console.log("Login bem-sucedido! Redirecionando...");
        setLoading(false);
        navigate("/admin-panel");
      } else {
        setError("Erro: resposta inválida do servidor");
        setLoading(false);
      }
    } catch (err) {
      setError("Erro de conexão com o servidor.");
      console.error("Erro:", err);
      setLoading(false);
    }
  }

  return (
    <div className="p-5 flex flex-col gap-7 items-center justify-center h-screen bg-gradient-to-b from-[#064648] to-[#0FA9AE]">
      <main className="w-full max-w-md mx-auto flex flex-col gap-6 bg-white rounded-2xl shadow-lg p-6 items-center">
        <section className="flex flex-col items-center gap-5">
          <a href="/home">
            <img
              src="/src/assets/Logo/Chearche.jpg"
              alt="Logo da igreja"
              className="w-20 rounded-[50px] opacity-[80%]"
            />
          </a>
          <h1 className="font-bold text-lg">Associação Salvação</h1>
        </section>

        <h1 className="font-extrabold text-3xl text-center text-[#064648] mb-4">
          Login do Administrador
        </h1>

        <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Digite o usuário do administrador"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            required
          />
          <Input
            type="password"
            placeholder="Digite a senha do administrador"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
          {error && (
            <span className="text-red-600 text-sm font-semibold">{error}</span>
          )}

          <button
            type="submit"
            className="bg-[#064648] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#0a6c6c] disabled:opacity-50 w-full"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </main>
    </div>
  );
}
