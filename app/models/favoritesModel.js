const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Favorites extends Model {}

Favorites.init(
  {
    //arbres_idbase de l'open data
    tree_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "favorites",
  },
);

module.exports = Favorites;
