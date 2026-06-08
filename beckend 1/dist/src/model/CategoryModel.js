"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// _id -> ObjectId
const CategorySchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        min: 2,
        max: 100,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        originalName: String,
        filename: String,
        size: Number,
        destination: String,
    },
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});
const CategoryModel = mongoose_1.default.model("Category", CategorySchema);
exports.default = CategoryModel;
//# sourceMappingURL=CategoryModel.js.map