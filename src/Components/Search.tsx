import { FiSearch } from "react-icons/fi";

const Search = ({
  value,
  onChange,
  onSearch,
}: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value ?? "");
    }
  };
  return (
    <div className="flex justify-end max-w-full overflow-hidden">
      <div className="relative w-full max-w-xs">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Busque por nome"
          className="border border-gray-300 rounded-2xl p-2 pl-10 w-full min-w-0 pr-0 focus:border-[#064648] focus:ring-2 focus:ring-[#C4F1CD] transition"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default Search;
