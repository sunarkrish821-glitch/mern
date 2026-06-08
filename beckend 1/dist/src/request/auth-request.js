"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterSchema = exports.LoginSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.LoginSchema = zod_1.default.object({
    username: zod_1.default.string().nonempty().nonoptional(),
    password: zod_1.default.string().nonempty().nonoptional(),
});
exports.UserRegisterSchema = zod_1.default.object({
    firstName: zod_1.default.string().min(2).max(20).nonempty("First Name is required"),
    maidenName: zod_1.default.string().nullable(),
    lastName: zod_1.default.string().min(2).max(20).nonempty("Last Name is required"),
    email: zod_1.default.email().nonempty("Email is required"),
    username: zod_1.default.string().min(3).max(25).nonempty("Username is required"),
    password: zod_1.default
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\\0-9])(?=.*[\W-_]).{8,25}$/, "Password does not follow strong password rule."),
    confirmPassword: zod_1.default.string().nonempty(),
    phone: zod_1.default.string().nullable(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password does not match",
    path: ['confirmPassword']
});
// Seeder run
//# sourceMappingURL=auth-request.js.map