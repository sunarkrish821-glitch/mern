import { type Request, type Response, type NextFunction } from "express"
import fs from "fs";

export const ErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  let code = error.code || 500;
  let detail = error.details || error.detail || null;
  let message = error.message || "Internal App Error";
  
  console.log(error)
  
  // manipulating Mongodb errors 
  if(error.name && error.name === 'MongoServerError') {
    // unique validation failed
    if(+error.code === 11000) {
      code = 400
      detail= {};
      // {email:1} => ["email"]
      Object.keys(error.keyPattern).map((key: string) => {
        detail[key] = `${key} should be unique`
      })
      message = "Validation Failed"
    }
  }


  // delete file if error 
  if (req.file && fs.existsSync(req.file.path)) {
    console.log(req.file)
    fs.unlinkSync(req.file.path);
  }
  // Todo: update 

  
  
  res.status(code).json({
    error: detail,
    message: message,
    status: false
  })
}