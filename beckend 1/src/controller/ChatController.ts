import type { Request, Response, NextFunction } from "express"
import MessageService from "../services/MessageService";
import { Op } from "sequelize";
import { AuthRequest } from "../types/Request";

class ChatController {
  async storeChat(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const newMessage = await MessageService.store(data);
      res.json({
        data: newMessage,
        message: "New message sent",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getAllChatByUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const loggedInUser = req.loggedInUser;
      let filter = {
        [Op.or]: [
          { sender: req.params.sender, receiver: loggedInUser?._id.toString() },
          { receiver: req.params.sender, sender: loggedInUser?._id.toString() },
        ],
      };
      //
      const page = (req.query.page || 1) as number;
      const limit = (req.query.limit || 10) as number;

      const { rows, pagination } = await MessageService.getAllByFilter(filter, {
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
    } catch (exception) {
      next(exception);
    }
  }

  async updateChatByFilter(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const message = await MessageService.getSingleRowByFilter({id: req.params.id})
      if(!message) {
        throw {code: 422, message: "Chat not found"}
      }
      const updated = await MessageService.updateSingleRowByFilter({id: req.params.id}, req.body)
      res.json({
        data: message,
        message: "Chat Updated successfully",
        meta: null
      })
    } catch (exception) {
      next(exception);
    }
  }

  async deleteChatByFilter(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const message = await MessageService.getSingleRowByFilter({id: req.params.id})
      if(!message) {
        throw {code: 422, message: "Chat not found"}
      }
      const updated = await MessageService.deleteSingleRowByFilter({id: req.params.id})
      res.json({
        data: message,
        message: "Chat deleted successfully",
        meta: null
      })
    } catch (exception) {
      next(exception);
    }
  }
}
export default ChatController;