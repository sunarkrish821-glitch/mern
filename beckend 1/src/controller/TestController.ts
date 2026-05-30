import { type Request, type Response, type NextFunction } from "express";

export const healthCheck = (req: Request, res: Response, next: NextFunction) => {
  // res.end("Hello world")
  res.json({
    data: "Health Ok",
    message: "Success",
    meta: null,
  });
};