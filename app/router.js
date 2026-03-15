const express = require("express");
const router = express.Router();
const treeController = require("./controllers/treeController");

// Routes d'envoi d'arbres
router.get("/arbres", treeController.getAllTrees);
router.get("/arbres/espece/:espece", treeController.getTreesByType);
router.get("/arbres/qualif/:qualif", treeController.getTreesByQualifier);
router.get("/arbres/:id", treeController.getOneTreeById);

// Export
module.exports = router;
