import BlogModel from "../model/BlogModel";
import slugify from "slugify";
import { mapImage } from "../utilities/helpers";
import type { AuthRequest } from "../types/Request";
import { AppConfig } from "../config/app-env";

class BlogService {
    static async generateUniqueSlug(title: string) {
        let slug = slugify(title, {
            lower: true,
        });

        while (await BlogModel.findOne({ slug: slug })) {
            slug = slug + "-" + Date.now();
        }
        return slug;
    }

    static async mapBlogForModel(req: AuthRequest) {
        const data = req.body;

        data.slug = await BlogService.generateUniqueSlug(data.title);

        if (req.file) {
            data.image = mapImage(req.file);
        }

        data.author = req?.loggedInUser?._id;

        return data;
    }

    static async mapBlogForUpdateModel(req: AuthRequest, oldBlog: any) {
        const data = req.body;

        if (req.file) {
            data.image = mapImage(req.file);
        } else {
            data.image = oldBlog.image;
        }

        return data;
    }

    static async createBlog(data: any) {
        try {
            const blog = new BlogModel(data);
            return await blog.save();
        } catch (exception) {
            throw exception;
        }
    }

    static mapBlogDetail(blog: any) {
        return {
            _id: blog._id,
            title: blog.title,
            slug: blog.slug,
            summary: blog.summary,
            description: blog.description,
            category: blog.category,
            status: blog.status,
            image: blog.image ? `${AppConfig.assetUrl}uploads/blogs/${blog.image.filename}` : null,
            author: blog.author,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
        };
    }

    static async getAllBlogs(
        filter = {},
        projection = {},
        config = { page: 1, limit: 10 }
    ) {
        try {
            const skip = (+config.page - 1) * +config.limit;
            const blogList = await BlogModel.find(filter, projection)
                .populate("author", "name email")
                .sort({ createdAt: "desc" })
                .skip(skip)
                .limit(config.limit);
            
            const totalBlogs = await BlogModel.countDocuments(filter);

            return {
                rows: blogList.map(BlogService.mapBlogDetail),
                pagination: {
                    current: +config.page,
                    limit: +config.limit,
                    totalCount: totalBlogs,
                    noOfPages: Math.ceil(totalBlogs / +config.limit),
                },
            };
        } catch (exception) {
            throw exception;
        }
    }

    static async getBlogByFilter(filter: Record<string, any>) {
        try {
            return await BlogModel.findOne(filter).populate("author", "name email");
        } catch (exception) {
            throw exception;
        }
    }

    static async updateBlog(filter: Record<string, any>, data: any) {
        try {
            return await BlogModel.findOneAndUpdate(filter, data, { new: true });
        } catch (exception) {
            throw exception;
        }
    }

    static async deleteBlog(filter: Record<string, any>) {
        try {
            return await BlogModel.findOneAndDelete(filter);
        } catch (exception) {
            throw exception;
        }
    }
}

export default BlogService;