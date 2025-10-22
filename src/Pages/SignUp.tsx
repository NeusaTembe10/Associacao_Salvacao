import Input from "../Components/Input";
import Button from "../Components/Button";
import { IoIosLogIn } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SignUp({
  showToast,
}: {
  showToast?: (msg: string, type?: "success" | "error" | "info") => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(
    () => localStorage.getItem("signup_email") || ""
  );
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(
    () => !!localStorage.getItem("signup_email")
  );
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Use o IP da sua máquina na rede local para funcionar no celular
  const GOOGLE_CLIENT_ID =
    "64491740238-adhb7tiv1rreaetehnvdi5qpk4sskd93.apps.googleusercontent.com";
  // Detecta IP local automaticamente para o Google OAuth e API
  const LOCAL_IP = window.location.hostname;
  const REDIRECT_URI = `http://${LOCAL_IP}:5173/auth/callback`;
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;

  function validatePassword(pw: string) {
    if (pw.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
    // Adicione outras validações se quiser (números, letras, etc)
    return "";
  }

  async function handleRegister() {
    const pwError = validatePassword(password);
    if (pwError) {
      setPasswordError(pwError);
      return;
    } else {
      setPasswordError("");
    }
    // Usa IP local para testes em rede local
    const apiUrl = `http://${LOCAL_IP}:5000`;
    const res = await fetch(`${apiUrl}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      if (rememberMe) {
        localStorage.setItem("signup_email", email);
      } else {
        localStorage.removeItem("signup_email");
      }
      // Salva o usuário logado (nome e email) no localStorage
      localStorage.setItem("user", JSON.stringify({ name, email }));
      if (showToast)
        showToast("Cadastro realizado! Verifique seu email.", "success");
      setTimeout(() => {
        sessionStorage.setItem("pendingEmail", email);
        navigate("/verification");
      }, 1200);
    } else {
      if (showToast) showToast(data.error || "Erro ao cadastrar", "error");
      console.log("Erro ao cadastrar:", data);
    }
  }

  return (
    <div className="p-5 text-center">
      <h1 className="font-bold text-3xl ">
        Seja bem-vindo a{" "}
        <span className="text-[#064648] ">Associação Salvação</span>
      </h1>
      <div className="text-[#4B5563] flex flex-col gap-4 pt-5">
        <p>
          Se inscreva para receber informações, fotografias e os livros da
          igreja.
        </p>
        <section className="flex flex-col gap-4">
          <div className="relative flex items-center">
            <FaUser className="h-5 w-5 text-[#4B5563] absolute " />
            <input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[50px] pl-12 pr-12 border-b-1 border-[#4B5563] focus:outline-none text-base placeholder:text-gray-400"
              autoComplete="name"
            />
          </div>
          <Input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <span className="text-red-500 text-xs text-left pl-1">
              {passwordError}
            </span>
          )}
        </section>
        <section className="flex gap-2">
          <input
            type="checkbox"
            name="check"
            id="check"
            className="size-[20px]"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="check">Lembrar-me</label>
        </section>
        <section className="mt-4 pt-5">
          <Button
            children="Cadastrar"
            customClass="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold bg-[#064648] hover:bg-[#096B6E] transition shadow"
            onclick={handleRegister}
            icon={<IoIosLogIn className="h-6 w-6" />}
          />
        </section>
        <section className="text-center pt-5">
          <p>
            Ja possui uma conta?{" "}
            <a href="/login" className="text-[#0588b8] font-semibold ml-auto">
              Entrar
            </a>
          </p>
        </section>
        <section className="flex items-center justify-center gap-4 pt-10">
          <div className="flex-1 border-b border-[#4B5563]"></div>
          <span className="text-sm text-[#4B5563] font-medium">ou com</span>
          <div className="flex-1 border-b border-[#4B5563]"></div>
        </section>

        <section className="flex flex-col gap-4 pt-5">
          {/* Google */}
          <button
            // href={googleLoginUrl}
            onClick={() => (window.location.href = googleLoginUrl)}
            className="flex items-center justify-center gap-3 border border-[#4B5563] rounded-[8px] py-3 cursor-pointer hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-[20px]" />
            <span className="text-sm text-[#4B5563] font-medium">
              Entrar com Google
            </span>
          </button>

          {/* Facebook */}
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
