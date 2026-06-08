"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlogService_1 = __importDefault(require("../services/BlogService"));
class BlogController {
    async create(req, res, next) {
        try {
            const data = await BlogService_1.default.mapBlogForModel(req);
            const blog = await BlogService_1.default.createBlog(data);
            res.json({
                data: blog,
                message: "Blog Created Successfully",
                meta: null,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async index(req, res, next) {
        try {
            const paginationConfig = {
                page: Number(req?.query?.page || 1),
                limit: Number(req?.query?.limit || 10),
            };
            let filter = {};
            if (req.query.search) {
                filter = {
                    $or: [
                        { title: new RegExp(req.query.search, "i") },
                        { summary: new RegExp(req.query.search, "i") },
                    ],
                };
            }
            if (req.query.category) {
                filter.category = req.query.category;
            }
            if (req.query.status) {
                filter.status = req.query.status;
            }
            const { rows, pagination } = await BlogService_1.default.getAllBlogs(filter, {}, paginationConfig);
            res.json({
                data: rows,
                message: "Blog List Fetched",
                meta: { pagination },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async show(req, res, next) {
        try {
            const slug = req.params.slug;
            const blog = await BlogService_1.default.getBlogByFilter({ slug });
            if (!blog) {
                throw { code: 404, message: "Blog not found" };
            }
            res.json({
                data: blog,
                message: "Blog Detail",
                meta: null,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const slug = req.params.slug;
            const blog = await BlogService_1.default.getBlogByFilter({ slug });
            if (!blog) {
                throw { code: 404, message: "Blog not found" };
            }
            const data = await BlogService_1.default.mapBlogForUpdateModel(req, blog);
            const updatedBlog = await BlogService_1.default.updateBlog({ slug }, data);
            res.json({
                data: updatedBlog,
                message: "Blog Updated Successfully",
                meta: null,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const deleted = await BlogService_1.default.deleteBlog({ _id: id });
            if (!deleted) {
                throw { code: 404, message: "Blog not found" };
            }
            res.json({
                data: deleted,
                message: "Blog Deleted Successfully",
                meta: null,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = BlogController;
//# sourceMappingURL=BlogController.js.map