import { Link } from "react-router-dom";
import { axiosInstance } from "../utils/axios";

function Navbar({ setArbres }) {
  const showAll = () => {
    if (setArbres) {
      axiosInstance.get("/arbres").then((response) => setArbres(response.data));
    }
  };
  return (
    <nav className="flex justify-end items-center py-4 px-10 mb-10 bg-white shadow-sm">
      <div className="flex gap-6 font-bold text-emerald-700">
        <Link to="/" className="hover:text-emerald-500" onClick={showAll}>
          Voir tous les arbres
        </Link>
        <Link to="/favorites" className="hover:text-emerald-500">
          Mes Favoris
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
