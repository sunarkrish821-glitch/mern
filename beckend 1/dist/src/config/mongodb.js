"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_env_1 = require("./app-env");
// Connect the db
(async () => {
    try {
        await mongoose_1.default.connect(app_env_1.MongodbConfig.url, {
            dbName: app_env_1.MongodbConfig.dbName,
            autoCreate: true,
            autoIndex: true
        });
        console.log("**** Mongodb Connected Successfully ****");
    }
    catch (exception) {
        console.error("**** Error mongodb connection ****");
        process.exit(1);
    }
})();
//# sourceMappingURL=mongodb.js.map