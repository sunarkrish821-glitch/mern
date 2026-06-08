"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const app_env_1 = require("./app-env");
const sequelize = new sequelize_1.Sequelize(app_env_1.SQLConfig.url, {
    dialect: "postgres",
    database: app_env_1.SQLConfig.dbName,
    logging: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
(async () => {
    try {
        await sequelize.authenticate();
        console.log("***** DB Connected successfully *****");
    }
    catch (exception) {
        console.error(exception);
        console.log("***** SQL Connection failed *****");
    }
})();
exports.default = sequelize;
//# sourceMappingURL=sqldb.js.map