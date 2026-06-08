"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../model/UserModel"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_env_1 = require("../config/app-env");
// import cloudinary from "../config/cloudinary";
const EmailService_1 = __importDefault(require("../services/EmailService"));
class AuthController {
    constructor() {
        this.login = async (req, res, next) => {
            try {
                // data
                const credentials = req.body;
                // .findById(id)
                // .find(filter)
                // .findOne(filter)
                const userDetail = await UserModel_1.default.findOne({
                    $or: [
                        { username: credentials.username },
                        { email: credentials.username },
                    ],
                });
                if (!userDetail) {
                    throw { code: 422, message: "User not found." };
                }
                // password verify
                if (!bcryptjs_1.default.compareSync(credentials.password, userDetail.password)) {
                    throw { code: 422, message: "Credentials does not match." };
                }
                const token = jsonwebtoken_1.default.sign({ sub: userDetail._id, typ: "Bearer" }, app_env_1.Secrets.jwtSecret, {
                    expiresIn: `${credentials.expiresInMinutes || 180} minutes`,
                });
                res.json({
                    data: {
                        accessToken: token,
                    },
                    message: "Login success",
                    meta: null,
                });
            }
            catch (exception) {
                next(exception);
            }
        };
        this.getUserDetailById = async (req, res, next) => {
            try {
                const params = req.params;
                // SELECT 
                // Select id, name,  from tables
                const userDetail = await UserModel_1.default.findById(params.userId, { password: 0, __v: 0, createdAt: 0, updatedAt: 0 });
                if (!userDetail) {
                    throw { code: 404, message: "User not found" };
                }
                res.json({
                    data: userDetail,
                    message: "User Detail",
                    meta: null
                });
            }
            catch (exception) {
                // console.log(exception)
                next(exception);
            }
        };
    }
    async register(req, res, next) {
        try {
            // console.log(req.body, req.file)
            // console.log(cloudinary.url(req.file?.filename as string, {
            //   transformation: [
            //     {aspect_ratio:1.0,width:1000}
            //   ]
            // }))
            const data = AuthService_1.default.mapUserDataForRegister(req);
            const user = await AuthService_1.default.storeUser(data);
            // notify user account registered
            const emailSvc = new EmailService_1.default();
            emailSvc.sendEmail({
                to: user.email,
                sub: "Your account has been registered.",
                body: `<strong>Dear ${user.firstName}</strong>,<br/>
          <p>Your account has been registerd. Please login to continue..</p>
          <div>
            <strong>Admin System</strong>
          </div>
        `
            });
            res.json({
                data: user,
                message: "User Account registered successfully",
                meta: null
            });
        }
        catch (exception) {
            next(exception);
        }
    }
    getLoggedInUserDetail(req, res, next) {
        //
        const loggedInUser = req.loggedInUser;
        res.json({
            data: {
                ...loggedInUser,
                // raw: loggedInUser?.image,
                image: `${app_env_1.AppConfig.assetUrl}uploads/user/${loggedInUser?.image?.filename}`,
            },
            message: "User Detail",
            meta: null,
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map