"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BlogSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 200,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    summary: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["Technology", "Health", "Lifestyle", "Education", "Other"],
        default: "Other",
        required: true,
    },
    image: {
        originalName: String,
        filename: String,
        size: Number,
        destination: String,
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },
    author: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});
const BlogModel = mongoose_1.default.model("Blog", BlogSchema);
exports.default = BlogModel;
//# sourceMappingURL=BlogModel.js.map