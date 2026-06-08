import { Router } from "express";
import AuthCheck from "../middleware/Auth";
import { bodyValidator } from "../middleware/Validator";
import z from "zod";
import ChatController from "../controller/ChatController";
const ChatRouter = Router()
const chatCtrl = new ChatController()


const chatCreateDTO = z.object({
  sender: z.string().nonempty(),
  receiver: z.string().nonempty(),
  message: z.string().min(1).max(2000)
})

ChatRouter.post('/', AuthCheck(), bodyValidator(chatCreateDTO), chatCtrl.storeChat)
ChatRouter.get('/:sender', AuthCheck(),  chatCtrl.getAllChatByUser)

// 
ChatRouter.put("/:id", AuthCheck(), bodyValidator(chatCreateDTO), chatCtrl.updateChatByFilter)
ChatRouter.delete("/:id", AuthCheck(), chatCtrl.deleteChatByFilter)

export default ChatRouter;