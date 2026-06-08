import { Router } from "express";
import AuthCheck from "../middleware/Auth";
import UserController from "../controller/UserController";

const userCtrl = new UserController();
const userRouter = Router()


userRouter.get("/", AuthCheck(), userCtrl.getAllUserList)
userRouter.get("/:userId", AuthCheck(), userCtrl.getUserDetailById)

export default userRouter;