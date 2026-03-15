require("dotenv").config();
const sequelize = require("./app/config/database");
const { User, Favorites } = require("./app/models");
const bcrypt = require("bcrypt");

const db = {
  create: async () => {
    try {
      await sequelize.drop();
      await sequelize.sync();
      await db.seeding();
    } catch (error) {
      console.log(error);
    }
  },
  seeding: async () => {
    try {
      const hashedPassword = await bcrypt.hash("test", 10);
      const admin = await User.create({
        username: "Admine",
        email: "test@test.fr",
        password: hashedPassword,
      });

      await Favorites.create({
        tree_id: 124358,
        user_id: admin.id,
      });

      console.log("utilisateur : hello@amine.works / test");
    } catch (error) {
      console.log(error);
    }
  },
};

db.create();
