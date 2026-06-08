"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sqldb_1 = __importDefault(require("../config/sqldb"));
// const MessageModel = sequelize.define("Message", {
//   id: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     primaryKey: true,
//     unique: true,
//     defaultValue: DataTypes.UUIDV4,
//   },
//   sender: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   receiver: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   message: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     allowNull: true,
//     defaultValue: Date.now(),
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     allowNull: true,
//     defaultValue: Date.now(),
//   },
// });
class MessageModel extends sequelize_1.Model {
}
MessageModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    sender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    receiver: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: Date.now(),
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: Date.now(),
    },
}, {
    sequelize: sqldb_1.default,
    modelName: "Messages",
    tableName: "messages",
});
exports.default = MessageModel;
//# sourceMappingURL=MessageModel.js.map