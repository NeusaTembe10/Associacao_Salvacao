import React from "react";
import Nav from "../../Components/Nav";
interface PageProps {
  titulo: string;
  conteudo: string[];
  emailSuporte?: string;
}

const HelpPage: React.FC<PageProps> = ({ titulo, conteudo, emailSuporte }) => {
  return (
    <div className="p-5 flex flex-col gap-7 min-h-screen">
          <Nav />
          <main className="w-full max-w-2xl mx-auto flex flex-col gap-6 bg-white rounded-2xl shadow p-6">
            <h1 className="font-extrabold text-3xl md:text-4xl text-center text-[#064648] mb-4">
              {titulo}
            </h1>
         <ul className="list-disc pl-6 text-[#064648] text-base md:text-lg space-y-2">
        {conteudo.map((item, index) => (
          <li key={index} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul>
      {emailSuporte && (
        <p className="mt-4 text-center text-blue-700">
          Precisa de mais ajuda?{" "}
          <a href={`mailto:${emailSuporte}`} className="underline">
            {emailSuporte}
          </a>
        </p>
      )}
          </main>
        </div>
  
  );
};

export default HelpPage;
