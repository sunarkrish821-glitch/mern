"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTPConfig = exports.CloudinaryConfig = exports.AppConfig = exports.Secrets = exports.SQLConfig = exports.MongodbConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.MongodbConfig = {
    url: process.env.MONGODB_URL,
    dbName: process.env.MONGODB_DB_NAME,
};
exports.SQLConfig = {
    url: process.env.SQL_DB_URL,
    dbName: process.env.SQL_DB_NAME
};
exports.Secrets = {
    jwtSecret: process.env.JWT_SECRET
};
exports.AppConfig = {
    assetUrl: process.env.ASSETS_URL,
};
exports.CloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
};
exports.SMTPConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM_ADDRESS
};
//# sourceMappingURL=app-env.js.map