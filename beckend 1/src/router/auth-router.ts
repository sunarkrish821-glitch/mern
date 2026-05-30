import { Router } from "express";
import { bodyValidator } from "../middleware/Validator";
import { LoginSchema, UserRegisterSchema } from "../request/auth-request";
import AuthCheck from "../middleware/Auth";
import AuthController from "../controller/AuthController";
import uploader from "../middleware/Uploader";

const authCtrl = new AuthController()

const authRouter = Router();

authRouter.post('/register', uploader('/user').single('image'), bodyValidator(UserRegisterSchema), authCtrl.register)

authRouter.post("/login", bodyValidator(LoginSchema), authCtrl.login);
authRouter.get("/me", AuthCheck(), authCtrl.getLoggedInUserDetail);


// paramterized routes
authRouter.get("/:userId", AuthCheck(['admin']),  authCtrl.getUserDetailById);


export default authRouter;