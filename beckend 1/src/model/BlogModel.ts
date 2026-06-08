import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
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
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});

const BlogModel = mongoose.model("Blog", BlogSchema);
export default BlogModel;