const { User, Favorites } = require("../models/index");

const userController = {
  toggleFavorite: async (request, response) => {
    try {
      const { userId, treeId } = request.body;

      if (!userId) {
        return response.status(400).json({ error: "userId manquant" });
      }
      if (!treeId) {
        return response.status(400).json({ error: "treeId manquant" });
      }

      const favorite = await Favorites.findOne({
        where: { user_id: userId, tree_id: treeId },
      });
      if (favorite) {
        await favorite.destroy();
        return response
          .status(200)
          .json({ message: "Retiré de la collection" });
      }

      await Favorites.create({
        user_id: userId,
        tree_id: treeId,
      });

      return response.status(201).json({ message: "Ajouté à la collection" });
    } catch (error) {
      console.error("Erreur Serveur :", error.message);
      response
        .status(500)
        .json({ error: "Erreur lors la modification de la collection" });
    }
  },
  getFavorites: async (request, response) => {
    try {
      const { userId } = request.params;
      if (!userId) {
        return response.status(400).json({ error: "userId manquant" });
      }

      const favorites = await Favorites.findAll({
        where: { user_id: userId },
        attributes: ["tree_id"],
        raw: true,
      });

      return response.json(favorites);
    } catch (error) {
      console.error("Erreur Serveur :", error.message);
      response.status(500).json({ error: "Erreur lors l'accès aux favoris" });
    }
  },
};
module.exports = userController;
