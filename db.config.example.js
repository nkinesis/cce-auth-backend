module.exports = {
    HOST: "example.server",
    PORT: 3306,
    USER: "example",
    PASSWORD: "example",
    DB: "example",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};