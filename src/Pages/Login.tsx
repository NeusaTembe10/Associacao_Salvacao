import Button from "../Components/Button";
import Input from "../Components/Input";
import { FcGoogle } from "react-icons/fc";
import { IoIosLogIn } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";

const GOOGLE_CLIENT_ID =
  "64491740238-adhb7tiv1rreaetehnvdi5qpk4sskd93.apps.googleusercontent.com";
const LOCAL_IP = window.location.hostname;
const REDIRECT_URI = `http://${LOCAL_IP}:5173/auth/callback`;
const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export default function Login({
  showToast,
}: {
  showToast?: (msg: string, type?: "success" | "error" | "info") => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setMessage({ type: "error", text: "Preencha email e senha" });
      if (showToast) showToast("Preencha email e senha", "error");
      setLoading(false);
      return;
    }

    try {
      console.log("🔐 Tentando login com:", email);

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("📋 Resposta:", data);

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Erro ao logar" });
        if (showToast) showToast(data.error || "Erro ao logar", "error");
        setLoading(false);
        return;
      }

      // Se precisa de verificação
      if (data.verify) {
        console.log("✔️ Email precisa de verificação");
        setMessage({
          type: "success",
          text: "Código de verificação enviado! Redirecionando...",
        });
        if (showToast) showToast("Código enviado para seu email!", "success");

        // Salva email para o próximo passo
        localStorage.setItem("pendingEmail", email);

        setTimeout(() => {
          window.location.href = `/verification?email=${encodeURIComponent(email)}`;
        }, 2000);
        return;
      }

      // Se já está verificado, faz login
      console.log("✅ Login bem-sucedido!");
      localStorage.removeItem("isAdmin");
      localStorage.setItem("userType", "user");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage({
        type: "success",
        text: "Login realizado! Redirecionando...",
      });
      if (showToast) showToast("Login realizado!", "success");

      setTimeout(() => {
        window.location.href = "/Home";
      }, 1500);
    } catch (err) {
      console.error("❌ Erro:", err);
      setMessage({ type: "error", text: "Erro de conexão com o servidor" });
      if (showToast) showToast("Erro de conexão", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-5 text-center">
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg text-base font-semibold ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <h1 className="font-bold text-3xl">
        Seja bem-vindo a{" "}
        <span className="text-[#064648]">Associação Salvação</span>
      </h1>

      <div className="flex flex-col gap-4 pt-5 text-[#4B5563]">
        <p>
          Entre com seu email e senha para receber informações, fotografias e os
          livros da igreja.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />

          <section className="flex gap-2">
            <input type="checkbox" name="check" className="size-[20px]" />
            <label htmlFor="check">Lembrar-me</label>
            <a href="/forget" className="text-[#0588b8] font-semibold ml-auto">
              Esqueci minha senha
            </a>
          </section>

          <section className="mt-4 pt-5">
            <Button
              children={loading ? "Entrando..." : "Entrar"}
              customClass="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold bg-[#064648] hover:bg-[#096B6E] transition shadow disabled:opacity-50"
              onclick={(e) => {
                e.preventDefault();
                handleLogin(e as any);
              }}
              icon={<IoIosLogIn className="h-6 w-6" />}
            />
          </section>
        </form>

        <section>
          <p className="text-center">
            Ainda não possui uma conta?{" "}
            <a href="/SignUp" className="text-[#0588b8] font-semibold">
              Inscreva-se
            </a>
          </p>
        </section>

        <section className="flex items-center justify-center gap-4 pt-10">
          <div className="flex-1 border-b border-[#4B5563]"></div>
          <span className="text-sm text-[#4B5563] font-medium">ou com</span>
          <div className="flex-1 border-b border-[#4B5563]"></div>
        </section>

        <section className="flex flex-col gap-4 pt-5">
          <button
            onClick={() => (window.location.href = googleLoginUrl)}
            className="flex items-center justify-center gap-3 border border-[#4B5563] rounded-[8px] py-3 cursor-pointer hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-[20px]" />
            <span className="text-sm text-[#4B5563] font-medium">
              Entrar com Google
            </span>
          </button>

          <div className="flex items-center justify-center gap-3 border border-[#4B5563] rounded-[8px] py-3 cursor-pointer hover:bg-gray-100 transition">
            <FaFacebook className="text-[20px] text-[#1877F2]" />
            <span className="text-sm text-[#4B5563] font-medium">
              Entrar com Facebook
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
