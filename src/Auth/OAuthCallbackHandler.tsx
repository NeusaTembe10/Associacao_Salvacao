import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const OAuthCallbackHandler = ({
  showToast,
}: {
  showToast?: (msg: string, type?: "success" | "error" | "info") => void;
}) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get("code");
    const error = params.get("error");

    if (error) {
      if (showToast) showToast("Erro no login via Google", "error");
      navigate("/Login");
      return;
    }

    if (code) {
      fetch("http://localhost/google-auth/auth-google.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.token) {
            if (showToast) showToast("Erro ao autenticar", "error");
            navigate("/Login");
            return;
          }

          // Salva token e dados do usuário
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("userType", "user");

          if (showToast) showToast("Login via Google realizado!", "success");
          navigate("/Home"); // Redireciona após login
        })
        .catch((err) => {
          console.error("Erro:", err);
          if (showToast) showToast("Erro no login via Google", "error");
          navigate("/Login");
        });
    }
  }, [params, navigate, showToast]);

  return null; // Não renderiza nada durante o callback
};

export default OAuthCallbackHandler;