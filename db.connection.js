const dbConfig = require("./config.js");
const Sequelize = require("sequelize");
const connection = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: "-05:00", // for writing to database
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

module.exports = {
  library: Sequelize,
  connection: connection,
};
