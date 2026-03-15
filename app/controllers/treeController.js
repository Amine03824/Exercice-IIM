const axios = require("axios");

// Les champs que je veux des arbres
const fields = `
      arbres_idbase,
      com_nom_usuel,
      com_nom_latin,
      com_site,
      geom_x_y,
      com_qualification_rem,
      com_resume,
      arbres_hauteurenm,
      arbres_circonferenceencm,
      com_annee_plantation,
      com_descriptif,
      com_url_photo1,
      com_copyright1`;

const apiUrl =
  "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbresremarquablesparis/records";

const treeController = {
  // Récupérer tous les arbres (page d'accueil)
  getAllTrees: async (request, response) => {
    try {
      // Charger les 20 premiers arbres puis mettre le offset de la page
      const page = parseInt(request.query.page) || 0;
      const limit = 25;

      const resAPI = await axios.get(apiUrl, {
        params: {
          select: fields,
          limit: limit,
          offset: page * limit,
        },
      });

      // Formatage pour le Front
      const currentYear = new Date().getFullYear();

      const formattedData = resAPI.data.results.map((tree) => ({
        id: tree.arbres_idbase,
        nom: tree.com_nom_usuel || "Arbre Anonyme",
        nomLatin: tree.com_nom_latin,
        categorie: tree.com_qualification_rem,
        coords: tree.geom_x_y,
        lieu: tree.com_site,
        photo: {
          url: tree.com_url_photo1 || null,
          copyright: tree.com_copyright1 || null,
        },
        stats: {
          hauteur: tree.arbres_hauteurenm,
          circonference: tree.arbres_circonferenceencm,
          annee: tree.com_annee_plantation,
          age: parseInt(tree.com_annee_plantation)
            ? currentYear - tree.com_annee_plantation
            : "Âge inconnu",
        },
        lore: {
          resume: tree.com_resume,
          description: tree.com_descriptif,
        },
      }));

      response.json(formattedData);
    } catch (error) {
      console.error("Erreur API :", error.message);
      response
        .status(500)
        .json({ error: "Erreur lors de la récupération des données" });
    }
  },

  getTreesByType: async (request, response) => {
    try {
      const typeOfTree = request.params.espece;

      const resAPI = await axios.get(apiUrl, {
        params: {
          select: fields,
          limit: 50,
          // where et non refine askip refine pose des problèmes avec les ' chez Opendatasoft
          where: `arbres_libellefrancais="${typeOfTree}"`,
        },
      });

      const currentYear = new Date().getFullYear();

      const formattedData = resAPI.data.results.map((tree) => ({
        id: tree.arbres_idbase,
        nom: tree.com_nom_usuel || "Arbre Anonyme",
        nomLatin: tree.com_nom_latin,
        categorie: tree.com_qualification_rem,
        coords: tree.geom_x_y,
        lieu: tree.com_site,
        photo: {
          url: tree.com_url_photo1 || null,
          copyright: tree.com_copyright1 || null,
        },
        stats: {
          hauteur: tree.arbres_hauteurenm,
          circonference: tree.arbres_circonferenceencm,
          annee: tree.com_annee_plantation,
          age: parseInt(tree.com_annee_plantation)
            ? currentYear - tree.com_annee_plantation
            : "Âge inconnu",
        },
        lore: {
          resume: tree.com_resume,
          description: tree.com_descriptif,
        },
      }));

      response.json(formattedData);
    } catch (error) {
      console.error("Erreur API :", error.message);
      response
        .status(500)
        .json({ error: "Erreur lors de la récupération des données" });
    }
  },

  getTreesByQualifier: async (request, response) => {
    try {
      const qualifRemarquable = request.params.qualif;

      const resAPI = await axios.get(apiUrl, {
        params: {
          select: fields,
          limit: 50,
          // where et non refine askip refine pose des problèmes avec les ' chez Opendatasoft
          where: `com_qualification_rem="${qualifRemarquable}"`,
        },
      });

      const currentYear = new Date().getFullYear();

      const formattedData = resAPI.data.results.map((tree) => ({
        id: tree.arbres_idbase,
        nom: tree.com_nom_usuel || "Arbre Anonyme",
        nomLatin: tree.com_nom_latin,
        categorie: tree.com_qualification_rem,
        coords: tree.geom_x_y,
        lieu: tree.com_site,
        photo: {
          url: tree.com_url_photo1 || null,
          copyright: tree.com_copyright1 || null,
        },
        stats: {
          hauteur: tree.arbres_hauteurenm,
          circonference: tree.arbres_circonferenceencm,
          annee: tree.com_annee_plantation,
          age: parseInt(tree.com_annee_plantation)
            ? currentYear - tree.com_annee_plantation
            : "Âge inconnu",
        },
        lore: {
          resume: tree.com_resume,
          description: tree.com_descriptif,
        },
      }));

      response.json(formattedData);
    } catch (error) {
      console.error("Erreur API :", error.message);
      response
        .status(500)
        .json({ error: "Erreur lors de la récupération des données" });
    }
  },

  getOneTreeById: async (request, response) => {
    console.log("controller appelé");
    try {
      const { id } = request.params;
      console.log(`arbres_idbase=${id}`);

      const resAPI = await axios.get(apiUrl, {
        params: {
          select: fields,
          where: `arbres_idbase=${id}`,
        },
      });
      if (resAPI.data.results.length === 0) {
        return response.status(404).json({ error: "Arbre non trouvé" });
      }
      // Formatage pour le Front
      const currentYear = new Date().getFullYear();

      const formattedData = resAPI.data.results.map((tree) => ({
        id: tree.arbres_idbase,
        nom: tree.com_nom_usuel || "Arbre Anonyme",
        nomLatin: tree.com_nom_latin,
        categorie: tree.com_qualification_rem,
        coords: tree.geom_x_y,
        lieu: tree.com_site,
        photo: {
          url: tree.com_url_photo1 || null,
          copyright: tree.com_copyright1 || null,
        },
        stats: {
          hauteur: tree.arbres_hauteurenm || "??", // dans le style de certaines cartes yugioh
          circonference: tree.arbres_circonferenceencm || "??",
          annee: tree.com_annee_plantation,
          age: parseInt(tree.com_annee_plantation)
            ? currentYear - tree.com_annee_plantation
            : "Âge inconnu",
        },
        lore: {
          resume: tree.com_resume || null,
          description: tree.com_descriptif || null,
        },
      }));

      response.json(formattedData);
    } catch (error) {
      console.error("Erreur API :", error.message);
      response
        .status(500)
        .json({ error: "Erreur lors de la récupération des données" });
    }
  },
};

module.exports = treeController;
