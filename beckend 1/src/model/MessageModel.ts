import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sqldb";

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


class MessageModel extends Model {}

MessageModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Date.now(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Date.now(),
    },
  },
  {
    sequelize,
    modelName: "Messages",
    tableName: "messages",
  },
);

export default MessageModel;