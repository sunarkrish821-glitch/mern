import { Router } from "express";
import { healthCheck } from "../controller/TestController";
import authRouter from "./auth-router";
import productRouter from "./product-router";
import userRouter from "./user-router";
import ChatRouter from "./chat-router";
import blogRouter from "./blog-router";

// router 
const router: Router = Router()


// this method accepts any method type for given url
// app.use('path', (req: Request, res: Response, next: Nextfunction) => { // definition here s})

// for any method

router.get("/", healthCheck);
router.use("/auth", authRouter)
router.use("/products", productRouter)
router.use('/user', userRouter)
router.use('/chat', ChatRouter)
router.use("/blogs", blogRouter)


// router.use('/category', categoryRouter)

// method bind
// app.get('/');
// app.post('/');
// app.put('/');
// app.patch('/');
// app.delete('/');


// 100+
export default router;