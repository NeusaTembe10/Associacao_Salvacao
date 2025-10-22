import { useState } from "react";
import Input from "../Components/Input";
export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Autentica admin via backend
    console.log("Tentando login admin", username);
    fetch("https://as-production-e22a.up.railway.app/api/auth/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Erro ao autenticar.");
          console.log("Erro ao autenticar:", data);
          return;
        }
        const data = await res.json();
        console.log("Login admin bem-sucedido", data);
        // Salva dados do admin logado
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminId", data.id);
        localStorage.setItem("adminName", data.username);
        localStorage.setItem("userType", data.type);
        setError("");
        window.location.href = "/admin-panel";
      })
      .catch((err) => {
        setError("Erro de conexão com o servidor.");
        console.log("Erro de conexão:", err);
      });
  }

  return (
    <div className="p-5  flex flex-col gap-7 items-center justify-center  h-screen ">
      <main className="w-full max-w-md mx-auto flex flex-col gap-6 bg-white rounded-2xl shadow p-6 items-center">
        <section className="flex flex-col items-center gap-5">
          <a href="/home">
            <img
              src="/src/assets/Logo/Chearche.jpg"
              alt="Logo da igreja"
              className="w-20 rounded-[50px] opacity-[80%]"
            />
          </a>
          <h1 className="font-bold">Associação Salvação</h1>
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
          />
          <Input
            type="password"
            placeholder="Digite a senha do administrador"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <span className="text-red-600 text-sm font-semibold">{error}</span>
          )}

          <button
            type="submit"
            className="bg-[#064648] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#0a6c6c]"
            onClick={handleLogin}
          >
            Entrar
          </button>
        </form>
      </main>
    </div>
  );
}
