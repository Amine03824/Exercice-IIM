const User = require("./userModel");
const Favorites = require("./favoritesModel");

User.hasMany(Favorites, {
  foreignKey: "user_id",
  as: "favorites",
});

Favorites.belongsTo(User, {
  // Comme mes cartes ne sont pas en BDD ce n'est pas une relation many to many donc pas de table d'association à gérer
  foreignKey: "user_id",
  as: "user",
});

module.exports = { User, Favorites };
