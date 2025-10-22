import { useState, useEffect } from "react";

export default function VerificationPage() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos em segundos
  // O email deve ser passado via navegação interna da aplicação (ex: via props, context ou state)
  // Exemplo: via sessionStorage (mais seguro que localStorage e não depende do navegador lembrar)
  const email = sessionStorage.getItem("pendingEmail") || "";

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  async function handleVerify() {
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Conta verificada com sucesso!");
      setTimeout(() => {
        window.location.href = "/Home";
      }, 1500);
    } else {
      setMessage(data.error || "Código inválido.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col gap-6 items-center">
        <h1 className="font-extrabold text-3xl md:text-4xl text-center text-[#064648] mb-4">
          Verificação de Conta
        </h1>
        <p className="text-center text-[#4B5563] text-base md:text-lg mb-2">
          Digite o código recebido para ativar sua conta.
        </p>
        <input
          type="text"
          value={email}
          disabled
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-center text-lg mb-2 cursor-not-allowed"
        />
        <input
          type="text"
          placeholder="Digite o código de 7 dígitos"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0588b8] focus:outline-none transition text-center text-lg mb-4 tracking-widest"
          value={code}
          maxLength={7}
          pattern="[0-9]{7}"
          onChange={(e) => {
            // Permite apenas números
            const val = e.target.value.replace(/\D/g, "");
            setCode(val);
          }}
          disabled={loading}
        />
        <button
          className="w-full py-3 rounded-lg bg-gradient-to-r from-[#064648] to-[#0588b8] text-white font-semibold text-lg shadow hover:from-[#0588b8] hover:to-[#064648] transition flex items-center justify-center"
          onClick={handleVerify}
          disabled={loading || code.length !== 7 || !email.trim()}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin inline-block w-5 h-5 border-2 border-t-2 border-t-white border-white rounded-full mr-2"></span>
              Processando...
            </span>
          ) : (
            "Verificar"
          )}
        </button>
        {message && (
          <div
            className={`mt-2 text-center font-semibold ${
              message.includes("sucesso") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}
        <div className="text-xs text-gray-500 mt-4 text-center">
          O código é enviado para o email informado e expira em{" "}
          <span className="font-bold text-[#064648]">
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </span>{" "}
          minutos.
          <br />
          Caso não receba, verifique sua caixa de spam ou tente novamente.
          <br />
          {timeLeft <= 0 && (
            <span className="text-red-600 font-semibold">
              O código expirou. Faça login novamente para receber um novo
              código.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
