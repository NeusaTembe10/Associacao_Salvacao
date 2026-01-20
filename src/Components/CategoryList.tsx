import { BiBookOpen } from "react-icons/bi";
import { FaCamera, FaHeadphones } from "react-icons/fa";
import { MdBookmark } from "react-icons/md";
import Category from "./Category";
import { useNavigate } from "react-router-dom";

interface CategoryListProps {
  filter?: string;
}

const categories = [
  { text: "Fotos", icon: <FaCamera />, route: "/fotos", external: false },
  {
    text: "Videos e audios",
    icon: <FaHeadphones />,
    route: "/videoseaudios",
    external: false,
  },
  {
    text: "Pregações",
    icon: <MdBookmark />,
    route: "/pregacoes",
    external: false,
  },
  {
    text: "Biblioteca",
    icon: <BiBookOpen />,
    route: "https://antanaz.github.io/Livraria-test/loja/loja.html",
    external: true,
  },
];

const CategoryList = ({ filter = "all" }: CategoryListProps) => {
  const navigate = useNavigate();
  const filtered =
    filter === "all"
      ? categories
      : categories.filter((cat) => cat.text === filter);

  const handleClick = (route: string, external: boolean) => {
    if (external) {
      // Link externo
      window.location.href = route;
    } else {
      // Link interno
      navigate(route);
    }
  };

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
            onClick={() => handleClick(cat.route, cat.external)}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
