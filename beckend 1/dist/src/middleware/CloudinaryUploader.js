"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const cloudinaryUploader = (dir = '/') => {
    const cloudStorage = new multer_storage_cloudinary_1.CloudinaryStorage({
        cloudinary: cloudinary_1.default,
        params: () => {
            return {
                folder: `api-62${dir}`,
                allowed_format: ["jpg", "jpeg", "png", "svg", "webp", "bmp", "gif"],
                unique_filename: true
            };
        }
    });
    return (0, multer_1.default)({
        storage: cloudStorage
    });
};
exports.default = cloudinaryUploader;
//# sourceMappingURL=CloudinaryUploader.js.map