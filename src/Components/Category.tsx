interface ButtonProps {
  text: string;
  icon: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  customClass?: string;
}

const Category = ({ text, icon, onClick, customClass }: ButtonProps) => {
  const colorCategory: { [key: string]: string } = {
    Biblioteca: "#C4F1CD",
    Fotos: "#1B4332",
    "Videos e audios": "#38BDF8",
    Pregações: "#007F91",
  };

  const textColor: { [key: string]: string } ={
    Livros: "#000000",
    Fotos: "#ffff",
    "Videos e audios": "#1F2937",
    Pregações: "#1F2937",
  }

  const bgColor = colorCategory[text] || "#E5E7EB";
  const textColorValue = textColor[text] || "#064648";

  return (
    <div className=" w-full rounded-2xl overflow-hidden">

      <button
        onClick={onClick}
        className={`w-full h-[100px] flex items-center justify-between px-5  text-white transition hover:opacity-90 ${customClass}`}
        style={{ backgroundColor: bgColor }}
        
      >
        <span className={`text-base font-bold`} style={{ color: textColorValue }}>{text}</span>
        <span className="text-2xl" style={{ color: textColorValue }}>{icon}</span>
      </button>
    </div>
  );
};

export default Category;
