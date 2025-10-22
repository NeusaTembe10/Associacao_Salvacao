const ForgetPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] to-[#f1f8e9] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col gap-6 items-center">
        <h1 className="font-extrabold text-3xl md:text-4xl text-center text-[#064648] mb-4">
          Recuperar Senha
        </h1>
        <p className="text-center text-[#4B5563] text-base md:text-lg mb-4">
          Informe seu e-mail para receber um link de redefinição de senha.
        </p>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0588b8] focus:outline-none transition text-lg mb-4"
        />
        <button className="w-full py-3 rounded-lg bg-gradient-to-r from-[#064648] to-[#0588b8] text-white font-semibold text-lg shadow hover:from-[#0588b8] hover:to-[#064648] transition">
          Enviar link
        </button>
      </div>
    </div>
  );
};
export default ForgetPassword;
