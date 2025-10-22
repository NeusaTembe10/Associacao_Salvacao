import { MdOutlineEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";
import { LuEyeClosed } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";
import { IoMdPerson } from "react-icons/io";

type InputProps = {
  placeholder: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ placeholder, type, value, onChange }: InputProps) => {
  const [internalValue, setInternalValue] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const eyesType = {
    open: <FaRegEye className="w-5 h-5" />,
    closed: <LuEyeClosed className="w-5 h-5" />,
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    } else {
      setInternalValue(event.target.value);
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      {/* Ícone à esquerda */}
      <div className="absolute top-1/2 -translate-y-1/2 text-gray-500">
        {type === "email" ? (
          <MdOutlineEmail className="w-5 h-5" />
        ) : type === "password" ? (
          <PiPasswordBold className="w-6 h-5" />
        ) : (
          <IoMdPerson />
        )}
      </div>

      {/* Ícone de olho à direita (só se type=password) */}
      {type === "password" && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? eyesType.open : eyesType.closed}
        </button>
      )}

      {/* Campo de input com padding à esquerda e direita */}
      <input
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value !== undefined ? value : internalValue}
        onChange={handleChange}
        className="w-full h-[50px] pl-12 pr-12 border-b-1 border-[#4B5563] focus:outline-none text-base placeholder:text-gray-400"
      />
    </div>
  );
};

export default Input;
