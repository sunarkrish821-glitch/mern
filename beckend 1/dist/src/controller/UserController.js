"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../model/UserModel"));
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
    async getAllUserList(req, res, next) {
        try {
            const userList = await UserModel_1.default.find({}, { password: 0, __v: 0, "image.destination": 0, "image.originalName": 0, "image.size": 0 });
            // optimize 
            // a. over or under fetch
            // b. Pagination
            res.json({
                data: userList,
                message: "Your user List",
                meta: {
                    pagination: {}
                }
            });
        }
        catch (exception) {
            next(exception);
        }
    }
    async getUserDetailById(req, res, next) {
        try {
            const userDetail = await UserService_1.default.getSingleRowByFile({
                _id: req.params.userId
            });
            res.json({
                data: userDetail,
                message: "User Detail",
                meta: null
            });
        }
        catch (exception) {
            next(exception);
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map