"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Validator_1 = require("../middleware/Validator");
const auth_request_1 = require("../request/auth-request");
const Auth_1 = __importDefault(require("../middleware/Auth"));
const AuthController_1 = __importDefault(require("../controller/AuthController"));
// import uploader from "../middleware/Uploader";
const CloudinaryUploader_1 = __importDefault(require("../middleware/CloudinaryUploader"));
const authCtrl = new AuthController_1.default();
const authRouter = (0, express_1.Router)();
// authRouter.post('/register', uploader('/user').single('image'), bodyValidator(UserRegisterSchema), authCtrl.register)
authRouter.post('/register', (0, CloudinaryUploader_1.default)('/user').single('image'), (0, Validator_1.bodyValidator)(auth_request_1.UserRegisterSchema), authCtrl.register);
authRouter.post("/login", (0, Validator_1.bodyValidator)(auth_request_1.LoginSchema), authCtrl.login);
authRouter.get("/me", (0, Auth_1.default)(), authCtrl.getLoggedInUserDetail);
// paramterized routes
authRouter.get("/:userId", (0, Auth_1.default)(['admin']), authCtrl.getUserDetailById);
exports.default = authRouter;
//# sourceMappingURL=auth-router.js.map