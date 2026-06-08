"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
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
    description: { type: String, required: true, min: 20 },
    category: {
        type: mongoose_1.default.Types.ObjectId, // Smartphones, Smart-phones, smartphones
        ref: "Category",
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 100,
    },
    discountPercentage: {
        type: Number,
        min: 0,
        max: 100,
    },
    afterDiscount: {
        type: Number,
        required: true,
    },
    stock: Number,
    // tags: [String],
    tags: [
        {
            type: String,
            required: false,
            default: null,
        },
    ],
    brand: String,
    weight: Number,
    dimensions: {
        sizes: [String],
        width: Number,
        height: Number,
        depth: Number,
    },
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: {
        type: String,
        enum: ["available", "low Stock", "not available"],
        default: "available",
    },
    returnPolicy: String,
    minimumOrderQuantity: {
        type: Number,
        default: 1,
    },
    thumbnail: {
        originalName: String,
        filename: String,
        size: Number,
        destination: String,
    },
    images: [
        {
            originalName: String,
            filename: String,
            size: Number,
            destination: String,
        },
    ],
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        default: null,
    },
    updatedBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        default: null,
    },
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});
const ProductModel = mongoose_1.default.model("Product", ProductSchema);
exports.default = ProductModel;
//# sourceMappingURL=ProductModel.js.map