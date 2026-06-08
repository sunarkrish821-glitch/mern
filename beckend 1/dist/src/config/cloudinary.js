"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const app_env_1 = require("./app-env");
cloudinary_1.v2.config({
    cloud_name: app_env_1.CloudinaryConfig.cloud_name,
    api_key: app_env_1.CloudinaryConfig.api_key,
    api_secret: app_env_1.CloudinaryConfig.api_secret
});
exports.default = cloudinary_1.v2;
//# sourceMappingURL=cloudinary.js.map