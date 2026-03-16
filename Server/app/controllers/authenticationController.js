// const jwt = require("jsonwebtoken"); // TODO rajouter la gestion du JWT
const bcrypt = require("bcrypt");
const { User, Favorites } = require("../models/index");

const authenticationController = {
  signUp: async (request, response) => {
    try {
      const { username, email, password, passwordConfirmation } = request.body;

      if (
        typeof username !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        typeof passwordConfirmation !== "string"
      ) {
        return response.status(400).json({
          error:
            "Erreur Paramètre manquant ou incorrect dans le corps de la requête",
        });
      }
      if (password !== passwordConfirmation) {
        return response
          .status(400)
          .json({ error: "Erreur Les mots de passe ne correspondent pas" });
      }
      const alreadyExists = await User.findOne({ where: { email } });
      if (alreadyExists) {
        return response
          .status(400)
          .json({ error: "Cet email est déjà utilisé" }); // Je sais que normalement c'est pas le top
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        password: hashedPassword,
        username,
      });

      //   const token = jwt.sign(
      //    { id: newUser.id, email: newUser.email },
      //     process.env.JWT_SECRET,
      //      { expiresIn: "24h" },
      //     );

      response.status(201).json({
        message: "Utilisateur créé avec succès",
        user: {
          id: newUser.id,
          username: newUser.username,
        },
        //     token,
      });
    } catch (error) {
      console.error("Erreur Serveur :", error.message);
      response.status(500).json({ error: "Erreur lors de l'inscription" });
    }
  },
  logIn: async (request, response) => {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return response.status(401).json({ error: "Identifiants incorrects" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return response.status(401).json({ error: "Identifiants incorrects" });
      }

      response.json({
        message: "Connexion réussie",
        user: {
          id: user.id,
          username: user.username,
        },
      });
    } catch (error) {
      console.error("Erreur Serveur :", error.message);
      response.status(500).json({ error: "Erreur lors de la connexion" });
    }
  },

  delete: async (request, response) => {
    try {
      const userId = request.body.userId;
      if (!userId) {
        return response.status(400).json({ error: "userId manquant" });
      }
      await Favorites.destroy({ where: { user_id: userId } });
      await User.destroy({ where: { id: userId } });
      response.status(200).json({ message: "Compte supprimé" });
    } catch (error) {
      console.error("Erreur Serveur :", error.message);
      response
        .status(500)
        .json({ error: "Erreur lors la mise à jour du profil" });
    }
  },
};
module.exports = authenticationController;
