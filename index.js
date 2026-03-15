require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./app/router");
const sequelize = require("./app/config/database");
const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

const PORT = process.env.PORT;

const start = async () => {
  try {
    await sequelize.sync();
    console.log("Sequelize ready");

    app.listen(PORT, () => {
      console.log(`API lancée sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erreur lors du démarrage de la DB", error);
  }
};

start();
