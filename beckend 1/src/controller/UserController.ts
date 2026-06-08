import type { Request, Response, NextFunction } from "express";
import UserModel from "../model/UserModel";
import UserService from "../services/UserService";

class UserController{
  async getAllUserList(req: Request, res: Response, next: NextFunction) {
    try {

      const userList = await UserModel.find({}, {password: 0, __v: 0, "image.destination": 0, "image.originalName": 0, "image.size": 0 })

      // optimize 
        // a. over or under fetch
        // b. Pagination
        
      res.json({
        data: userList,
        message: "Your user List",
        meta: {
          pagination: {}
        }
      })
    } catch(exception) {
      next(exception)
    }
  }
  async getUserDetailById(req: Request, res: Response, next:NextFunction) {
    try {
      const userDetail = await UserService.getSingleRowByFile({
        _id: req.params.userId as string
      })
      res.json({
        data: userDetail,
        message: "User Detail",
        meta: null
      })
    } catch(exception) {
      next(exception)
    }
  }
}
export default UserController;