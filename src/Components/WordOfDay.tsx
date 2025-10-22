import { useEffect, useState } from "react";
import { MdMenuBook } from "react-icons/md";
import { verses } from "./VersesList";
import type { VerseData } from "./VersesList";
const WordOfDay = () => {
  const [verseData, setVerseData] = useState<VerseData | null>(null);

  useEffect(() => {
    // Sorteio determinístico por dia
    const today = new Date();
    const idx = today.getDate() % verses.length;
    setVerseData(verses[idx]);
  }, []);

  return (
    <div>
      <h1 className="text-[20px] font-bold ">Versículo do dia</h1>
      <div className="bg-white p-4 rounded shadow max-w-md mx-auto mt-4">
        <MdMenuBook className="text-2xl text-gray-500 mb-2" />

        {verseData ? (
          <>
            <p className="text-gray-800 text-lg italic">"{verseData.verse}"</p>
            <p className="text-sm text-gray-500 mt-2">
              — {verseData.reference}
            </p>
            <a
              href={verseData.url}
              target="_blank"
              className="text-blue-500 underline text-sm mt-2 block"
              rel="noreferrer"
            >
              Ver na Bíblia
            </a>
          </>
        ) : (
          <p className="text-red-500">
            Não foi possível carregar o versículo do dia.
          </p>
        )}
      </div>
    </div>
  );
};
export default WordOfDay;
