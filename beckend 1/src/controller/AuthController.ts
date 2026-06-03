import { type Request, type Response, type NextFunction } from "express";
import UserModel from "../model/UserModel";
import AuthService from "../services/AuthService";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { AppConfig, Secrets } from "../config/app-env";
import { AuthRequest } from "../types/Request";
// import cloudinary from "../config/cloudinary";
import EmailService from "../services/EmailService";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      
      // console.log(req.body, req.file)

      // console.log(cloudinary.url(req.file?.filename as string, {
      //   transformation: [
      //     {aspect_ratio:1.0,width:1000}
      //   ]
      // }))
      const data = AuthService.mapUserDataForRegister(req);
      const user = await AuthService.storeUser(data);

      // notify user account registered
      const emailSvc = new EmailService();
      emailSvc.sendEmail({
        to: user.email, 
        sub: "Your account has been registered.",
        body: `<strong>Dear ${user.firstName}</strong>,<br/>
          <p>Your account has been registerd. Please login to continue..</p>
          <div>
            <strong>Admin System</strong>
          </div>
        `
      })

      res.json({
        data: user,
        message: "User Account registered successfully",
        meta: null
      })
    } catch(exception) {
      next(exception)
    }
  }

  login =async (req: Request, res: Response, next: NextFunction) => {
    try{
      // data
      const credentials = req.body;
      // .findById(id)
      // .find(filter)
      // .findOne(filter)
      const userDetail = await UserModel.findOne({
        $or: [
          { username: credentials.username },
          { email: credentials.username },
        ],
      });

      if(!userDetail) {
          throw {code: 422, message: "User not found."}
      }

      // password verify
      if(!bcrypt.compareSync(credentials.password, userDetail.password)) {
        throw {code: 422, message: "Credentials does not match."}
      }

      const token = jwt.sign(
        { sub: userDetail._id, typ: "Bearer" },
        Secrets.jwtSecret as string,
        {
          expiresIn: `${credentials.expiresInMinutes || 180} minutes`,
        },
      );

      res.json({
        data: {
          accessToken: token,
        },
        message: "Login success",
        meta: null,
      });
    } catch(exception) {
      next(exception)
    }
  };

  getUserDetailById = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const params = req.params;
      // SELECT 
        // Select id, name,  from tables
      const userDetail = await UserModel.findById(params.userId, {password: 0, __v: 0, createdAt: 0, updatedAt: 0})

      if(!userDetail) {
        throw {code: 404, message: "User not found"}
      } 
      
      res.json({
        data: userDetail,
        message: "User Detail",
        meta: null
      })
    } catch(exception) {
      // console.log(exception)
      next(exception)
    }
  };

  getLoggedInUserDetail(req: AuthRequest, res: Response, next: NextFunction) {
    //
    const loggedInUser = req.loggedInUser;
    res.json({
      data: {
        ...loggedInUser,
        // raw: loggedInUser?.image,
        image: `${AppConfig.assetUrl}uploads/user/${loggedInUser?.image?.filename}`,
      },
      message: "User Detail",
      meta: null,
    });
  }
}

export default AuthController;