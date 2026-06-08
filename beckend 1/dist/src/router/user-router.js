"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = __importDefault(require("../middleware/Auth"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const userCtrl = new UserController_1.default();
const userRouter = (0, express_1.Router)();
userRouter.get("/", (0, Auth_1.default)(), userCtrl.getAllUserList);
userRouter.get("/:userId", (0, Auth_1.default)(), userCtrl.getUserDetailById);
exports.default = userRouter;
//# sourceMappingURL=user-router.js.map