"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_env_1 = require("../config/app-env");
const UserModel_1 = __importDefault(require("../model/UserModel"));
const AuthCheck = (role = null) => {
    // 
    return async (req, res, next) => {
        try {
            let token = req.headers.authorization || null;
            if (!token) {
                next({ code: 401, message: "Login required" });
            }
            else {
                // token is present
                // verify token
                token = token.replace("Bearer ", "");
                // Token: verify
                const data = jsonwebtoken_1.default.verify(token, app_env_1.Secrets.jwtSecret);
                // const userDetail = await UserModel.findById(data.sub);
                const userDetail = await UserModel_1.default.findOne({
                    _id: data.sub
                });
                if (!userDetail) {
                    // throw 
                    next({ code: 404, message: "User not found" });
                    // throw {code: 401, message: "User does not exists anymore!"}
                }
                else {
                    // user exists
                    req.loggedInUser = {
                        image: userDetail.image,
                        _id: userDetail._id,
                        firstName: userDetail.firstName,
                        maidenName: userDetail.maidenName,
                        lastName: userDetail.lastName,
                        email: userDetail.email,
                        username: userDetail.username,
                        phone: userDetail.phone,
                        role: userDetail.role
                    };
                    if (!role || (role && role.includes(userDetail.role)) || userDetail.role === 'admin') {
                        next();
                    }
                    else {
                        throw { code: 403, message: "Access Denied" };
                    }
                }
            }
        }
        catch (exception) {
            if (exception instanceof jsonwebtoken_1.default.TokenExpiredError) {
                next({ code: 401, message: "Token expired" });
            }
            else if (exception instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                next({ code: 401, message: "JWT Error: " + exception.message });
            }
            else {
                next(exception);
            }
        }
    };
};
exports.default = AuthCheck;
//# sourceMappingURL=Auth.js.map