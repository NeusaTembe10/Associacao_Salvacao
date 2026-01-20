import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";


export default function VerificationPage() {
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

  // Pega email da URL ou do sessionStorage
  const email =
    searchParams.get("email") || sessionStorage.getItem("pendingEmail") || "";

  useEffect(() => {
    if (!email) {
      setMessage({
        type: "error",
        text: "Email não fornecido. Redirecionando...",
      });
      setTimeout(() => {
        window.location.href = "/signup";
      }, 2000);
    }
  }, [email]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();

    if (!code || code.length !== 6) {
      setMessage({
        type: "error",
        text: "Digite um código válido com 6 dígitos",
      });
      return;
    }

    if (!email) {
      setMessage({ type: "error", text: "Email não fornecido" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      console.log("✔️ Verificando código:", { email, code });
      console.log("📡 API URL:", API_URL);

      const res = await fetch(`${API_URL}/api/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      console.log("📋 Resposta status:", res.status);

      const data = await res.json();
      console.log("📋 Resposta data:", data);

      if (res.ok && data.success) {
        setMessage({
          type: "success",
          text: "Conta verificada com sucesso! Redirecionando...",
        });

        // Salva token e dados do usuário
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userType", "user");
        sessionStorage.removeItem("pendingEmail");

        setTimeout(() => {
          window.location.href = "/Home";
        }, 1500);
      } else {
        setMessage({
          type: "error",
          text: data.error || "Código inválido.",
        });
      }
    } catch (err) {
      console.error("❌ Erro:", err);
      setMessage({
        type: "error",
        text: "Erro ao verificar. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  }

  if (!email) {
    return (
      <div className="p-5 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 font-semibold">
          ❌ Email não fornecido
        </div>
        <a
          href="/signup"
          className="text-[#0588b8] font-semibold hover:underline"
        >
          Voltar ao Registro
        </a>
      </div>
    );
  }

  return (
    <div className="p-5 text-center">
      <h1 className="font-bold text-3xl">
        Verificação de{" "}
        <span className="text-[#064648]">Associação Salvação</span>
      </h1>

      <div className="flex flex-col gap-4 pt-5 text-[#4B5563]">
        <p>
          Enviamos um código de verificação para <strong>{email}</strong>.
          Digite o código de 6 dígitos abaixo para confirmar sua conta.
        </p>

        {message && (
          <div
            className={`p-3 rounded-lg text-base font-semibold ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleVerify}>
          <div>
            <label className="block text-left text-sm font-semibold text-[#064648] mb-2">
              Código de Verificação (6 dígitos)
            </label>
            <input
              type="text"
              placeholder="000000"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#0588b8] focus:outline-none transition text-center text-2xl font-bold tracking-widest"
              value={code}
              maxLength={6}
              pattern="[0-9]*"
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setCode(val);
              }}
              disabled={loading}
              required
            />
          </div>

          <section className="mt-2 pt-3">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold bg-[#064648] hover:bg-[#096B6E] transition shadow disabled:opacity-50"
              disabled={loading || code.length !== 6}
            >
              {loading ? "Verificando..." : "Verificar Código"}
            </button>
          </section>
        </form>

        <section className="flex items-center justify-center gap-4 pt-5">
          <div className="flex-1 border-b border-[#4B5563]"></div>
          <span className="text-sm text-[#4B5563] font-medium">
            ⏱️ {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </span>
          <div className="flex-1 border-b border-[#4B5563]"></div>
        </section>

        <section className="text-center text-sm text-gray-600 pt-5">
          <p className="mb-2">
            💡 Não recebeu o código?{" "}
            <a href="/login" className="text-[#0588b8] font-bold">
              Faça login novamente
            </a>
          </p>
          {timeLeft <= 0 && (
            <p className="text-red-600 font-semibold">
              ❌ Código expirou. Faça login para receber um novo.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
