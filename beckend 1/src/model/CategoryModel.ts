import mongoose from "mongoose";

// _id -> ObjectId
const CategorySchema = new mongoose.Schema({
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

const CategoryModel = mongoose.model("Category", CategorySchema)
export default CategoryModel;