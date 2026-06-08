"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../model/UserModel"));
class UserService {
    static async getSingleRowByFile(filter) {
        try {
            const userDetail = await UserModel_1.default.findOne(filter, { password: 0, __v: 0 });
            return userDetail;
        }
        catch (exception) {
            throw exception;
        }
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map