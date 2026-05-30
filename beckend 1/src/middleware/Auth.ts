import { type Response, type NextFunction } from "express"
import Jwt from "jsonwebtoken";
import { Secrets } from "../config/app-env";
import UserModel from "../model/UserModel";
import { AuthRequest } from "../types/Request";

const AuthCheck = (role: null | Array<string> = null ) => {
  // 
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      let token = req.headers.authorization || null;

      if (!token) {
        next({ code: 401, message: "Login required" });
      } else {
        // token is present
        // verify token
        token = token.replace("Bearer ", "");

        // Token: verify
        const data = Jwt.verify(token, Secrets.jwtSecret as string);

        // const userDetail = await UserModel.findById(data.sub);
        const userDetail = await UserModel.findOne({
          _id: data.sub
        });
        if(!userDetail) {
          // throw 
          next({code: 404, message: "User not found"})
          // throw {code: 401, message: "User does not exists anymore!"}
        } else {
          // user exists
          req.loggedInUser = {
            image: userDetail.image,
            _id: userDetail._id as unknown as string,
            firstName:userDetail.firstName,
            maidenName: userDetail.maidenName,
            lastName:userDetail.lastName,
            email: userDetail.email,
            username: userDetail.username,
            phone: userDetail.phone,
            role: userDetail.role
          }

          if(!role || (role && role.includes(userDetail.role)) || userDetail.role === 'admin' ) {
            next()
          } else {
            throw {code: 403, message: "Access Denied"}
          }
        }

      }
    } catch(exception) {
      if(exception instanceof Jwt.TokenExpiredError) {
        next({code: 401, message: "Token expired"})
      } else if(exception instanceof Jwt.JsonWebTokenError) {
        next({code: 401, message: "JWT Error: "+exception.message})
      } else {
        next(exception)
      }

    }
  }
}

export default AuthCheck;