"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageService_1 = __importDefault(require("../services/MessageService"));
const sequelize_1 = require("sequelize");
class ChatController {
    async storeChat(req, res, next) {
        try {
            const data = req.body;
            const newMessage = await MessageService_1.default.store(data);
            res.json({
                data: newMessage,
                message: "New message sent",
                meta: null,
            });
        }
        catch (exception) {
            next(exception);
        }
    }
    async getAllChatByUser(req, res, next) {
        try {
            const loggedInUser = req.loggedInUser;
            let filter = {
                [sequelize_1.Op.or]: [
                    { sender: req.params.sender, receiver: loggedInUser?._id.toString() },
                    { receiver: req.params.sender, sender: loggedInUser?._id.toString() },
                ],
            };
            //
            const page = (req.query.page || 1);
            const limit = (req.query.limit || 10);
            const { rows, pagination } = await MessageService_1.default.getAllByFilter(filter, {
                page,
                limit,
            });
            res.json({
                data: rows,
                message: "Your messages",
                meta: {
                    pagination,
                },
            });
        }
        catch (exception) {
            next(exception);
        }
    }
    async updateChatByFilter(req, res, next) {
        try {
            const message = await MessageService_1.default.getSingleRowByFilter({ id: req.params.id });
            if (!message) {
                throw { code: 422, message: "Chat not found" };
            }
            const updated = await MessageService_1.default.updateSingleRowByFilter({ id: req.params.id }, req.body);
            res.json({
                data: message,
                message: "Chat Updated successfully",
                meta: null
            });
        }
        catch (exception) {
            next(exception);
        }
    }
    async deleteChatByFilter(req, res, next) {
        try {
            const message = await MessageService_1.default.getSingleRowByFilter({ id: req.params.id });
            if (!message) {
                throw { code: 422, message: "Chat not found" };
            }
            const updated = await MessageService_1.default.deleteSingleRowByFilter({ id: req.params.id });
            res.json({
                data: message,
                message: "Chat deleted successfully",
                meta: null
            });
        }
        catch (exception) {
            next(exception);
        }
    }
}
exports.default = ChatController;
//# sourceMappingURL=ChatController.js.map