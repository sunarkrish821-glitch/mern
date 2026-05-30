import { type NextFunction, type Request, type Response } from "express"
import z from "zod";

export const bodyValidator = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      
      if(!data) {
        next({code: 422, message: "Data not set."})
      } else {
        // validate 
        
        const parsedData = await schema.parseAsync(data)
        // console.log({data, parsedData})
        req.body = parsedData;
        next()
      }
    } catch(exception) {
      let errorBag: Record<string,string> = {}

      if(exception instanceof z.ZodError) {
        exception.issues.map((error) => {
          const key = error.path[0] as string
          errorBag[key] = error.message
        })  
      } 
      
      next({detail: errorBag, code: 400, message: "Validation Failed"})
    }
  }
}