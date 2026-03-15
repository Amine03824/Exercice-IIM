const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  define: { underscored: true }, // UserID en user_id
});

module.exports = sequelize;
