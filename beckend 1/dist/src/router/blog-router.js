"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BlogController_1 = __importDefault(require("../controller/BlogController"));
const Uploader_1 = __importDefault(require("../middleware/Uploader"));
const Auth_1 = __importDefault(require("../middleware/Auth"));
const Validator_1 = require("../middleware/Validator");
const blog_request_1 = require("../request/blog-request");
const blogRouter = (0, express_1.Router)();
const blogCtrl = new BlogController_1.default();
blogRouter.get("/", blogCtrl.index);
blogRouter.get("/:slug", blogCtrl.show);
blogRouter.post("/", (0, Auth_1.default)(["admin", "user"]), (0, Uploader_1.default)("/blogs").single("image"), (0, Validator_1.bodyValidator)(blog_request_1.BlogCreateDTO), blogCtrl.create);
blogRouter.put("/:slug", (0, Auth_1.default)(["admin", "user"]), (0, Uploader_1.default)("/blogs").single("image"), (0, Validator_1.bodyValidator)(blog_request_1.BlogCreateDTO), blogCtrl.update);
blogRouter.delete("/:id", (0, Auth_1.default)(["admin", "user"]), blogCtrl.delete);
exports.default = blogRouter;
//# sourceMappingURL=blog-router.js.map