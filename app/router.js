const express = require("express");
const router = express.Router();
const treeController = require("./controllers/treeController");
const authenticationController = require("./controllers/authenticationController");
const userController = require("./controllers/userController");

// Routes d'envoi d'arbres
router.get("/arbres", treeController.getAllTrees);
router.get("/arbres/espece/:espece", treeController.getTreesByType);
router.get("/arbres/qualif/:qualif", treeController.getTreesByQualifier);
router.get("/arbres/:id", treeController.getOneTreeById);

// Routes de gestion d'utilisateurs
router.post("/users", authenticationController.signUp);
router.delete("/users", authenticationController.delete);

// Routes de gestion des favoris
router.get("/favorites/:userId", userController.getFavorites);
router.post("/favorites", userController.toggleFavorite);
// Export
module.exports = router;
