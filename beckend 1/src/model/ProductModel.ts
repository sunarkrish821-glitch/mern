import mongoose from "mongoose";
// just for once till the category table is created
import CategoryModel from "./CategoryModel";

const ProductSchema = new mongoose.Schema({
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
    type: mongoose.Types.ObjectId, // Smartphones, Smart-phones, smartphones
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
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null,
  },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, {
  timestamps: true, 
  autoCreate: true, 
  autoIndex: true
});

const ProductModel = mongoose.model("Product", ProductSchema)
export default ProductModel;