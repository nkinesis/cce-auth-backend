module.exports = {
  HOST: "127.0.0.1",
  PORT: 5433,
  USER: "example",
  PASSWORD: "example",
  DB: "example",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  sessionDuration: 60,
};
