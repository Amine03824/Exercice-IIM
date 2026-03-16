import { useState, useEffect } from "react";
export default function TreeCard({ arbre }) {
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const icons = {
    Paysager: "🌳",
    Botanique: "🌱",
    Symbolique: "🍀",
    Historique: "⏳",
  };
  const colors = {
    Paysager: "bg-green-200",
    Botanique: "bg-blue-200",
    Symbolique: "bg-purple-200",
    Historique: "bg-orange-200",
  };
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsMapOpen(false);
        setIsPhotoOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  return (
    <div className="border-[#C4A484] border-2 p-4 m-2 mt-3 w-80 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold">{arbre.nom}</h2>
      <p className="italic text-gray-600">{arbre.nomLatin}</p>
      <img
        src={arbre.photo.url}
        alt={arbre.nom}
        className="w-full h-40 object-cover my-2 rounded cursor-pointer"
        onClick={() => setIsPhotoOpen(true)}
      />
      <div
        className={`flex items-center gap-2 mb-2 p-2 rounded-xl w-fit ${colors[arbre.categorie]}`}
      >
        {" "}
        <span className="text-2xl">{icons[arbre.categorie]}</span>
        <span className="font-bold text-gray-700 uppercase text-l tracking-wide">
          {arbre.categorie}
        </span>
      </div>
      <p className="my-2 mb-2">{arbre.lore.resume}</p>
      <button
        onClick={() => setIsMapOpen(true)}
        className="w-full mt-2 mb-2 py-2.5 px-4 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-xl text-m font-medium transition-all duration-200 flex items-center justify-center gap-2 border border-slate-100 hover:border-blue-100"
      >
        🗺️ {arbre.lieu} ({arbre.arrondissement}e)
      </button>
      <ul className="text-l font-semibold mb-3">
        <li>Hauteur : {arbre.stats.hauteur} mètres</li>
        <li>Circonférence : {arbre.stats.circonference} cm</li>
        <li>
          Âge :{" "}
          {typeof arbre.stats.age === "number"
            ? `${arbre.stats.age} ans`
            : "Inconnu"}
        </li>
      </ul>
      <div className="border-t pt-2">
        <p>{arbre.lore.description}</p>
      </div>
      {isMapOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsMapOpen(false)}
        >
          <div
            className="bg-white p-4 rounded w-11/12 md:max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div>
              <h3 className="font-bold mb-4">
                {arbre.nom} du {arbre.lieu} ({arbre.arrondissement}e)
              </h3>
              <iframe
                title="Carte"
                className="w-full h-64 md:h-[500px] mb-4 border"
                src={`https://maps.google.com/maps?q=${arbre.coords.lat},${arbre.coords.lon}&z=17&output=embed`}
              ></iframe>
              <button onClick={() => setIsMapOpen(false)} className="font-bold">
                J'y vais !
              </button>
            </div>
          </div>
        </div>
      )}
      {isPhotoOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[50] p-4"
          onClick={() => setIsPhotoOpen(false)}
        >
          <div
            className=" max-w-5xl flex flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div>
              <img
                src={arbre.photo.url}
                alt={arbre.nom}
                className="max-h-[85vh] max-w-full rounded shadow-2xl object-contain"
              />
              {arbre.photo.copyright && (
                <span className="absolute bottom-2 right-2 bg-black text-white text-[10px] px-1.5 opacity-70">
                  © {arbre.photo.copyright}
                </span>
              )}
            </div>

            <p className="text-white mt-4 font-medium text-center">
              {arbre.nom} du {arbre.lieu}
            </p>
            <button
              className="mt-2 text-white/70 hover:text-white text-sm underline"
              onClick={() => setIsPhotoOpen(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}{" "}
    </div>
  );
}
