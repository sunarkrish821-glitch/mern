import type { Request } from "express";
import bcrypt from "bcryptjs"
import UserModel from "../model/UserModel";
import { IUserRegisterDetail } from "../request/auth-request";

class AuthService {
  static mapUserDataForRegister(req: Request) {
    const data = req.body;
    if (!data.role) {
      data.role = "user";
    }
    // password -> plain text
    data.password = bcrypt.hashSync(data.password, 12);
    if (req.file) {
      data.image = {
        originalName: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        destination: req.file.destination,
      };
    }
    return data as IUserRegisterDetail;
  }

  static async storeUser(data: IUserRegisterDetail) {
    const user = new UserModel(data);
    return await user.save(); // save() -=> insert, existing data .save() => update
  }
  
}

export default AuthService;