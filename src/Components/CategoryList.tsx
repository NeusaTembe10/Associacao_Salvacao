import { BiBookOpen } from "react-icons/bi";
import { FaCamera, FaHeadphones } from "react-icons/fa";
import { MdBookmark } from "react-icons/md";
import Category from "./Category"; // seu componente com SVG
import { useNavigate } from "react-router-dom";

interface CategoryListProps {
  filter?: string;
}

const categories = [
  { text: "Livros", icon: <BiBookOpen />, route: "/livros" },
  { text: "Fotos", icon: <FaCamera />, route: "/fotos" },
  { text: "Videos e audios", icon: <FaHeadphones />, route: "/videoseaudios" },
  { text: "Pregações", icon: <MdBookmark />, route: "/pregacoes" },
];

const CategoryList = ({ filter = "all" }: CategoryListProps) => {
  const navigate = useNavigate();
  const filtered =
    filter === "all"
      ? categories
      : categories.filter((cat) => cat.text === filter);
  return (
    <div>
      {filtered.map((cat, idx) => (
        <div
          key={cat.text}
          className={`z-${40 - idx * 10} ${idx !== 0 ? "-mt-7" : ""}`}
        >
          <Category
            text={cat.text}
            icon={cat.icon}
            onClick={() => navigate(cat.route)}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
