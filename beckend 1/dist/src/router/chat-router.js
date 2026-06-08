"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = __importDefault(require("../middleware/Auth"));
const Validator_1 = require("../middleware/Validator");
const zod_1 = __importDefault(require("zod"));
const ChatController_1 = __importDefault(require("../controller/ChatController"));
const ChatRouter = (0, express_1.Router)();
const chatCtrl = new ChatController_1.default();
const chatCreateDTO = zod_1.default.object({
    sender: zod_1.default.string().nonempty(),
    receiver: zod_1.default.string().nonempty(),
    message: zod_1.default.string().min(1).max(2000)
});
ChatRouter.post('/', (0, Auth_1.default)(), (0, Validator_1.bodyValidator)(chatCreateDTO), chatCtrl.storeChat);
ChatRouter.get('/:sender', (0, Auth_1.default)(), chatCtrl.getAllChatByUser);
// 
ChatRouter.put("/:id", (0, Auth_1.default)(), (0, Validator_1.bodyValidator)(chatCreateDTO), chatCtrl.updateChatByFilter);
ChatRouter.delete("/:id", (0, Auth_1.default)(), chatCtrl.deleteChatByFilter);
exports.default = ChatRouter;
//# sourceMappingURL=chat-router.js.map