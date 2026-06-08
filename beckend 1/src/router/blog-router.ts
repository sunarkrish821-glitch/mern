import { Router } from "express";
import BlogController from "../controller/BlogController";
import uploader from "../middleware/Uploader";
import AuthCheck from "../middleware/Auth";
import { bodyValidator } from "../middleware/Validator";
import { BlogCreateDTO } from "../request/blog-request";

const blogRouter = Router();
const blogCtrl = new BlogController();

blogRouter.get("/", blogCtrl.index);
blogRouter.get("/:slug", blogCtrl.show);

blogRouter.post("/", 
    AuthCheck(["admin", "user"]), 
    uploader("/blogs").single("image"), 
    bodyValidator(BlogCreateDTO), 
    blogCtrl.create
);

blogRouter.put("/:slug", 
    AuthCheck(["admin", "user"]), 
    uploader("/blogs").single("image"), 
    bodyValidator(BlogCreateDTO), 
    blogCtrl.update
);

blogRouter.delete("/:id", 
    AuthCheck(["admin", "user"]), 
    blogCtrl.delete
);

export default blogRouter;