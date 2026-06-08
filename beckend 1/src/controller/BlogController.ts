import type { Request, Response, NextFunction } from "express";
import BlogService from "../services/BlogService";
import { AuthRequest } from "../types/Request";

class BlogController {
    async create(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const data = await BlogService.mapBlogForModel(req);
            const blog = await BlogService.createBlog(data);
            res.json({
                data: blog,
                message: "Blog Created Successfully",
                meta: null,
            });
        } catch (error) {
            next(error);
        }
    }

    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const paginationConfig = {
                page: Number(req?.query?.page || 1),
                limit: Number(req?.query?.limit || 10),
            };
            let filter: Record<string, any> = {};
            
            if (req.query.search) {
                filter = {
                    $or: [
                        { title: new RegExp(req.query.search as string, "i") },
                        { summary: new RegExp(req.query.search as string, "i") },
                    ],
                };
            }

            if (req.query.category) {
                filter.category = req.query.category;
            }

            if (req.query.status) {
                filter.status = req.query.status;
            }

            const { rows, pagination } = await BlogService.getAllBlogs(
                filter,
                {},
                paginationConfig
            );

            res.json({
                data: rows,
                message: "Blog List Fetched",
                meta: { pagination },
            });
        } catch (error) {
            next(error);
        }
    }

    async show(req: Request, res: Response, next: NextFunction) {
        try {
            const slug = req.params.slug;
            const blog = await BlogService.getBlogByFilter({ slug });
            if (!blog) {
                throw { code: 404, message: "Blog not found" };
            }
            res.json({
                data: blog,
                message: "Blog Detail",
                meta: null,
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const slug = req.params.slug;
            const blog = await BlogService.getBlogByFilter({ slug });
            if (!blog) {
                throw { code: 404, message: "Blog not found" };
            }

            const data = await BlogService.mapBlogForUpdateModel(req, blog);
            const updatedBlog = await BlogService.updateBlog({ slug }, data);

            res.json({
                data: updatedBlog,
                message: "Blog Updated Successfully",
                meta: null,
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const deleted = await BlogService.deleteBlog({ _id: id });
            if (!deleted) {
                throw { code: 404, message: "Blog not found" };
            }
            res.json({
                data: deleted,
                message: "Blog Deleted Successfully",
                meta: null,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default BlogController;