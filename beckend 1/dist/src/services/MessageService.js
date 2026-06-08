"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageModel_1 = __importDefault(require("../model/MessageModel"));
class MessageService {
    // CRUD
    static async store(data) {
        try {
            // ~ INSERT INTO messages SET sender=?, receiver=?, message=? ....
            const message = await MessageModel_1.default.create(data);
            return message;
        }
        catch (exception) {
            throw exception;
        }
    }
    // list all fetch
    static async getAllByFilter(filter, paginationConfig = { page: 1, limit: 10 }) {
        try {
            const skip = (paginationConfig.page - 1) * paginationConfig.limit;
            const { rows, count } = await MessageModel_1.default.findAndCountAll({
                where: filter,
                // order: [["createdAt", "desc"]],
                offset: skip,
                limit: paginationConfig.limit,
            });
            return {
                rows,
                pagination: {
                    total: count,
                    limit: paginationConfig.limit,
                    page: paginationConfig.page,
                },
            };
        }
        catch (exception) {
            throw exception;
        }
    }
    // detail
    static async getSingleRowByFilter(filter) {
        try {
            const data = await MessageModel_1.default.findOne({
                where: filter,
            });
            return data;
        }
        catch (exception) {
            throw exception;
        }
    }
    // Upadate
    static async updateSingleRowByFilter(filter, data) {
        try {
            const updateResult = await MessageModel_1.default.update(data, {
                where: filter
            });
            return updateResult;
        }
        catch (exception) {
            throw exception;
        }
    }
    // Delete 
    static async deleteSingleRowByFilter(filter) {
        try {
            const deletedResult = await MessageModel_1.default.destroy({
                where: filter
            });
            return deletedResult;
        }
        catch (exception) {
            throw exception;
        }
    }
}
exports.default = MessageService;
//# sourceMappingURL=MessageService.js.map