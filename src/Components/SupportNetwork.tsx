import { FaPhoneAlt } from "react-icons/fa";
import { SiVodafone } from "react-icons/si";
import { GiMoneyStack } from "react-icons/gi";

const supportNumbers = [
  {
    name: "E-mola",
    icon: <GiMoneyStack className="text-[#FFA500] text-2xl" />,
    number: "+258 84 123 4567",
    description: "Apoie via Emola (Moçambique)",
  },
  {
    name: "M-pesa",
    icon: <SiVodafone className="text-[#FF0000] text-2xl" />,
    number: "+258 87 987 6543",
    description: "Apoie via Mpesa (Moçambique)",
  },
  {
    name: "Telefone Geral",
    icon: <FaPhoneAlt className="text-blue-500 text-2xl" />,
    number: "+258 21 555 0000",
    description: "Central de Apoio e Missões",
  },
];

export default function SupportNetwork() {
  return (
    <div className="px-2 sm:px-4 md:px-8 lg:px-0 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#064648] mb-6">
        Números de Apoio
      </h2>
      <div className="flex flex-col gap-6">
        {supportNumbers.map((item) => (
          <div
            key={item.name}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 bg-white rounded-xl shadow-md p-5 hover:scale-105 transition-transform border border-[#b2dfdb]"
          >
            <div className="flex-shrink-0 mb-2 sm:mb-0">{item.icon}</div>
            <div className="flex flex-col flex-1 items-center sm:items-start text-center sm:text-left">
              <span className="text-xl font-bold text-[#064648] tracking-wide">
                {item.name}
              </span>
              <span className="text-lg text-[#0588b8] font-mono select-all">
                {item.number}
              </span>
              <span className="text-sm text-[#4B5563] mt-1">
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center text-[#4B5563] text-sm italic opacity-80">
        "Cada contribuição faz a diferença na vida de muitos. Deus abençoe sua
        generosidade!"
      </div>
    </div>
  );
}
