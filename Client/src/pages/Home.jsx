import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axios";
import TreeCard from "../components/TreeCard";

function Home({ arbres, setArbres }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filterByCatgory = (category) => {
    const url = category ? `/arbres/qualif/${category}` : "/arbres";
    axiosInstance.get(url).then((response) => setArbres(response.data));
  };

  const filteredArbres = arbres.filter((arbre) =>
    arbre.nom.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-6xl mb-10 font-pacifico text-emerald-700 text-center">
        Les Arbres Remarquables de Paris
      </h1>
      <p className="text-3xl font-pacifico text-emerald-600 text-center mb-10 ">
        Sortez prendre l'air et attrapez les tous !
      </p>
      <div className="absolute top-0 left-5 z-50 w-fit">
        <input
          type="text"
          placeholder="Recherche"
          className="p-2 border-b-2 border-emerald-700 bg-transparent outline-none text-xl w-48"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => filterByCatgory("Paysager")}
          className="bg-green-200 px-4 py-2 rounded-full font-bold cursor-pointer"
        >
          🌳 Paysager
        </button>
        <button
          onClick={() => filterByCatgory("Botanique")}
          className="bg-blue-200 px-4 py-2 rounded-full font-bold cursor-pointer"
        >
          🌱 Botanique
        </button>
        <button
          onClick={() => filterByCatgory("Symbolique")}
          className="bg-purple-200 px-4 py-2 rounded-full font-bold cursor-pointer"
        >
          🍀 Symbolique
        </button>
        <button
          onClick={() => filterByCatgory("Historique")}
          className="bg-orange-200 px-4 py-2 rounded-full font-bold cursor-pointer"
        >
          ⏳ Historique
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5 justify-items-center">
        {filteredArbres.map((arbre) => (
          <TreeCard key={arbre.id} arbre={arbre} />
        ))}
      </div>
    </div>
  );
}

export default Home;
