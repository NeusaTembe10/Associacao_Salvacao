import React, { useState, useRef, useEffect } from "react";
import Nav from "../Components/Nav";
import { CiEdit } from "react-icons/ci";

export default function Perfil() {
  // Detecta tipo de usuário
  const userType = localStorage.getItem("userType");
  const isAdmin =
    localStorage.getItem("isAdmin") === "true" && userType === "admin";
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const adminName = localStorage.getItem("adminName") || "";
  const adminId = localStorage.getItem("adminId") || "";
  const [name, setName] = useState(isAdmin ? adminName : user.name || "");
  const [email, setEmail] = useState(
    isAdmin ? "admin@associacao.com" : user.email || ""
  );
  const [photo, setPhoto] = useState(user.photo || "");
  const [memberSince, setMemberSince] = useState(user.memberSince || "2025");
  const [lastAccess, setLastAccess] = useState(user.lastAccess || "Hoje");
  const [showEmailBox, setShowEmailBox] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const googleUser = JSON.parse(
      localStorage.getItem("googleUser") || "{}"
    );
    if (googleUser.name) setName(googleUser.name);
    if (googleUser.email) setEmail(googleUser.email);
    if (googleUser.photo) setPhoto(googleUser.photo);
  }, []);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const photoUrl = reader.result as string;
        setPhoto(photoUrl);
        // Atualiza o user local
        const updatedUser = {
          ...user,
          photo: photoUrl,
          name,
          email,
          memberSince,
          lastAccess,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        if (updatedUser.name) setName(updatedUser.name);
        if (updatedUser.email) setEmail(updatedUser.email);
        if (updatedUser.memberSince) setMemberSince(updatedUser.memberSince);
        if (updatedUser.lastAccess) setLastAccess(updatedUser.lastAccess);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleLogout() {
    localStorage.clear();
    setName("");
    setEmail("");
    setPhoto("");
    setMemberSince("");
    setLastAccess("");
    window.location.href = "/login";
  }

  return (
    <div className="p-4 min-h-screen flex flex-col gap-7 items-center">
      <Nav />
      <main className="w-full max-w-2xl mx-auto flex flex-col gap-8 bg-white rounded-2xl shadow-xl p-8 items-center md:p-10 lg:p-12">
        <h1 className="font-extrabold text-3xl md:text-4xl text-center text-[#064648] mb-4">
          Meu Perfil
        </h1>
        
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="relative group">
            <img
              src={photo || "/src/assets/Logo/Chearche.jpg"}
              alt="Foto de perfil"
              className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-[#064648] shadow-lg transition duration-300 group-hover:scale-105"
            />
            
              <button
                className="absolute bottom-2 right-2 bg-[#064648] text-white rounded-full p-2 text-xs shadow-lg hover:bg-[#0a6c6c] transition flex items-center gap-1"
                onClick={() => fileInputRef.current?.click()}
                title="Trocar foto"
              >
                <CiEdit className="w-4 h-4" />
                <span className="hidden sm:inline">Editar</span>
              </button>
            
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
          </div>
          <div className="flex flex-col gap-2 items-center mt-2 w-full">
            <span className="font-bold text-xl md:text-2xl text-[#064648]">
              {name}
            </span>

            <span className="text-[#4B5563] text-base md:text-lg flex items-center gap-2">
              {email}
              {!isAdmin && (
                <CiEdit
                  className="w-4 h-4 cursor-pointer hover:text-[#0a6c6c]"
                  title="Editar email"
                  onClick={() => {
                    setNewEmail(email);
                    setShowEmailBox(true);
                  }}
                />
              )}
            </span>
             <p className="text-center text-[#4B5563] text-sm md:text-base mt-2 px-4">
                      Você é um milagre de Deus!
                    </p>
            {isAdmin && (
              <span className="text-[#064648] text-sm font-semibold">
                ID do Admin: {adminId}
              </span>
            )}
            {showEmailBox && !isAdmin && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs flex flex-col gap-4">
                  <h2 className="text-lg font-bold text-[#064648] text-center">
                    Editar email
                  </h2>
                  <input
                    type="email"
                    className="border border-gray-300 rounded-lg p-2 w-full focus:border-[#064648] focus:ring-2 focus:ring-[#C4F1CD]"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    autoFocus
                  />
                  <div className="flex gap-2 justify-center mt-2">
                    <button
                      className="px-4 py-1 rounded bg-[#064648] text-white font-semibold hover:bg-[#0a6c6c] transition"
                      onClick={() => {
                        if (newEmail.trim() !== "") {
                          setEmail(newEmail);
                          setShowEmailBox(false);
                          const updatedUser = {
                            ...user,
                            name,
                            photo,
                            memberSince,
                            lastAccess,
                            email: newEmail,
                          };
                          localStorage.setItem(
                            "user",
                            JSON.stringify(updatedUser)
                          );
                        }
                      }}
                    >
                      Salvar
                    </button>
                    <button
                      className="px-4 py-1 rounded bg-gray-200 text-[#064648] font-semibold hover:bg-gray-300 transition"
                      onClick={() => setShowEmailBox(false)}
                    >
                      Cancelar
                    </button>
                   
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-full mt-4 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2 justify-center">
              {!isAdmin && (
                <>
                  <span className="bg-[#C4F1CD] text-[#064648] px-3 py-1 rounded-full text-xs font-semibold shadow whitespace-nowrap">
                    Membro desde: {memberSince}
                  </span>
                  <span className="bg-[#F6FFF8] text-[#4B5563] px-3 py-1 rounded-full text-xs font-semibold shadow whitespace-nowrap">
                    Último acesso: {lastAccess}
                  </span>
                </>
              )}
              {isAdmin && (
                <span className="bg-[#C4F1CD] text-[#064648] px-3 py-1 rounded-full text-xs font-semibold shadow whitespace-nowrap">
                  Tipo: Administrador
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          className="mt-6 py-2 px-6 rounded-lg bg-[#E53935] text-white font-semibold shadow hover:bg-[#B71C1C] transition w-full md:w-auto"
          onClick={handleLogout}
        >
          Sair
        </button>
      </main>
    </div>
  );
}

