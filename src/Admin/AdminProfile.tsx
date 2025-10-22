import { useEffect, useState } from "react";

export default function AdminProfile() {
  const [admin, setAdmin] = useState<{ id: number; username: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("adminName");
    if (!username) {
      setError("Nenhum administrador logado.");
      setLoading(false);
      return;
    }
    fetch(`/api/admin/profile?username=${encodeURIComponent(username)}`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Erro ao buscar perfil.");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setAdmin(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro de conexão com o servidor.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="p-8 text-center">Carregando perfil...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!admin) return null;

  return (
    <div className="p-8 flex flex-col items-center gap-4 bg-white rounded-2xl shadow max-w-md mx-auto mt-10">
      <img
        src="/src/assets/Logo/Chearche.jpg"
        alt="Logo da igreja"
        className="w-20 rounded-full opacity-80 mb-2"
      />
      <h2 className="font-bold text-2xl text-[#064648]">
        Perfil do Administrador
      </h2>
      <div className="flex flex-col gap-2 items-center">
        <span className="font-semibold">Usuário:</span>
        <span className="text-lg">{admin.username}</span>
        <span className="font-semibold">ID:</span>
        <span className="text-lg">{admin.id}</span>
      </div>
    </div>
  );
}
