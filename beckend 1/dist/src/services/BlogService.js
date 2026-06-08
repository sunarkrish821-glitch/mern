"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlogModel_1 = __importDefault(require("../model/BlogModel"));
const slugify_1 = __importDefault(require("slugify"));
const helpers_1 = require("../utilities/helpers");
const app_env_1 = require("../config/app-env");
class BlogService {
    static async generateUniqueSlug(title) {
        let slug = (0, slugify_1.default)(title, {
            lower: true,
        });
        while (await BlogModel_1.default.findOne({ slug: slug })) {
            slug = slug + "-" + Date.now();
        }
        return slug;
    }
    static async mapBlogForModel(req) {
        const data = req.body;
        data.slug = await BlogService.generateUniqueSlug(data.title);
        if (req.file) {
            data.image = (0, helpers_1.mapImage)(req.file);
        }
        data.author = req?.loggedInUser?._id;
        return data;
    }
    static async mapBlogForUpdateModel(req, oldBlog) {
        const data = req.body;
        if (req.file) {
            data.image = (0, helpers_1.mapImage)(req.file);
        }
        else {
            data.image = oldBlog.image;
        }
        return data;
    }
    static async createBlog(data) {
        try {
            const blog = new BlogModel_1.default(data);
            return await blog.save();
        }
        catch (exception) {
            throw exception;
        }
    }
    static mapBlogDetail(blog) {
        return {
            _id: blog._id,
            title: blog.title,
            slug: blog.slug,
            summary: blog.summary,
            description: blog.description,
            category: blog.category,
            status: blog.status,
            image: blog.image ? `${app_env_1.AppConfig.assetUrl}uploads/blogs/${blog.image.filename}` : null,
            author: blog.author,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
        };
    }
    static async getAllBlogs(filter = {}, projection = {}, config = { page: 1, limit: 10 }) {
        try {
            const skip = (+config.page - 1) * +config.limit;
            const blogList = await BlogModel_1.default.find(filter, projection)
                .populate("author", "name email")
                .sort({ createdAt: "desc" })
                .skip(skip)
                .limit(config.limit);
            const totalBlogs = await BlogModel_1.default.countDocuments(filter);
            return {
                rows: blogList.map(BlogService.mapBlogDetail),
                pagination: {
                    current: +config.page,
                    limit: +config.limit,
                    totalCount: totalBlogs,
                    noOfPages: Math.ceil(totalBlogs / +config.limit),
                },
            };
        }
        catch (exception) {
            throw exception;
        }
    }
    static async getBlogByFilter(filter) {
        try {
            return await BlogModel_1.default.findOne(filter).populate("author", "name email");
        }
        catch (exception) {
            throw exception;
        }
    }
    static async updateBlog(filter, data) {
        try {
            return await BlogModel_1.default.findOneAndUpdate(filter, data, { new: true });
        }
        catch (exception) {
            throw exception;
        }
    }
    static async deleteBlog(filter) {
        try {
            return await BlogModel_1.default.findOneAndDelete(filter);
        }
        catch (exception) {
            throw exception;
        }
    }
}
exports.default = BlogService;
//# sourceMappingURL=BlogService.js.map