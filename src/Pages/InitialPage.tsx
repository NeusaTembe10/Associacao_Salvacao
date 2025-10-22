import Logo from "../assets/Logo/Logo";
import Button from "../Components/Button";
import { FaUser, FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const InitialPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      {/* Logo */}
      <div className="p-1 flex justify-center sm:justify-start">
        <Logo />
      </div>

      {/* Conteúdo principal */}
      <div
        className="relative z-20 min-h-screen w-full flex flex-col items-center text-white px-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, #064648 0%, #0B8589 64%, #0FA9AE 100%)",
          borderRadius: "50px 50px 0px 0px",
        }}
      >
        {/* Imagem de fundo */}
        <div
          className="absolute top-0 left-0 h-full w-full bg-no-repeat bg-center bg-cover opacity-80 z-[-1] rounded-t-[50px]"
          style={{
            backgroundImage: "url('/src/assets/img/cruz.png')",
            backgroundSize: "cover", // Mantém proporção e preenche
            backgroundPosition: "center", // Centraliza a cruz
          }}
        ></div>

        {/* Texto de destaque */}
        <section className="mt-8 sm:mt-12 max-w-lg  sm:text-left px-4 ">
          <h1 className="font-bold font-[Roboto] text-2xl sm:text-3xl leading-snug mt-15 text-center">
            Um app da igreja para apoio espiritual, comunicação e crescimento na
            fé.
          </h1>
        </section>

        {/* Botões */}
        <section className="flex flex-col items-center gap-10  mt-40 w-full max-w-sm px-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-black font-bold py-3 px-4 flex justify-center items-center gap-4 rounded-[30px] hover:bg-[#44784f8b] w-full cursor-pointer transition-all"
          >
            <FaArrowRight
              style={{ animation: "moveArrow 1s ease-in-out infinite" }}
            />
            Entrar
          </button>

          <Button
            children="Criar uma nova conta"
            customClass="w-full cursor-pointer rounded-[30px]"
            onclick={() => navigate("/signup")}
            icon={<FaUser />}
          />
        </section>
      </div>
    </div>
  );
};

export default InitialPage;
