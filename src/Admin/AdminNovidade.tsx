import { useState } from "react";
import Nav from "../Components/Nav";

export default function AdminNovidade() {
  const [novidade, setNovidade] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (novidade.trim()) {
      localStorage.setItem("hasNewContent", "true");
      localStorage.setItem("newContentText", novidade.trim());
      setSuccess(true);
      setNovidade("");
    }
  }

  return (
    <div className="p-5 min-h-screen flex flex-col gap-7 items-center ">
      <Nav />
      <main className="w-full max-w-md mx-auto flex flex-col gap-6 bg-white rounded-2xl shadow p-6 items-center">
        <h1 className="font-extrabold text-3xl text-center text-[#064648] mb-4">
          Publicar Novidade
        </h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <textarea
            className="border rounded-lg p-2 w-full min-h-[80px]"
            placeholder="Digite a novidade para os usuários"
            value={novidade}
            onChange={(e) => setNovidade(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#064648] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#0a6c6c]"
          >
            Publicar
          </button>
          {success && (
            <span className="text-green-600 text-sm font-semibold">
              Novidade publicada!
            </span>
          )}
        </form>
      </main>
    </div>
  );
}
