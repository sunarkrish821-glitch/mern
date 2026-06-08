"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TestController_1 = require("../controller/TestController");
const auth_router_1 = __importDefault(require("./auth-router"));
const product_router_1 = __importDefault(require("./product-router"));
const user_router_1 = __importDefault(require("./user-router"));
const chat_router_1 = __importDefault(require("./chat-router"));
const blog_router_1 = __importDefault(require("./blog-router"));
// router 
const router = (0, express_1.Router)();
// this method accepts any method type for given url
// app.use('path', (req: Request, res: Response, next: Nextfunction) => { // definition here s})
// for any method
router.get("/", TestController_1.healthCheck);
router.use("/auth", auth_router_1.default);
router.use("/products", product_router_1.default);
router.use('/user', user_router_1.default);
router.use('/chat', chat_router_1.default);
router.use("/blogs", blog_router_1.default);
// router.use('/category', categoryRouter)
// method bind
// app.get('/');
// app.post('/');
// app.put('/');
// app.patch('/');
// app.delete('/');
// 100+
exports.default = router;
//# sourceMappingURL=router.js.map