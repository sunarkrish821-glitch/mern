"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
class AuthService {
    static mapUserDataForRegister(req) {
        const data = req.body;
        if (!data.role) {
            data.role = "user";
        }
        // password -> plain text
        data.password = bcryptjs_1.default.hashSync(data.password, 12);
        if (req.file) {
            data.image = {
                originalName: req.file.originalname,
                filename: req.file.filename,
                size: req.file.size,
                destination: req.file.destination,
            };
        }
        return data;
    }
    static async storeUser(data) {
        const user = new UserModel_1.default(data);
        return await user.save(); // save() -=> insert, existing data .save() => update
    }
}
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map