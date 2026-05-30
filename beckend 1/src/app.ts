import express, { type NextFunction, type Request, type Response, type Application } from "express"
import router from "./router/router";
import { ErrorHandler } from "./middleware/ErrorHandling";
import cors from "cors";
import helmet from "helmet"
import {rateLimit} from "express-rate-limit"
import path from "path";

// mongodb connect 
import "./config/mongodb";

// express application
const app: Application = express();     // server-side application


// security
// CORS (Cross origin Reference Site)
app.use(cors())
// helmet 
app.use(helmet({
  xXssProtection: true
}))

const limiter = rateLimit({
  limit: 150,
  windowMs: 300000
})
app.use(limiter);

// built in middlewares 
// parsers 
app.use(express.json({
  limit: "3mb"
}))   // json parsing

app.use(express.urlencoded({
  limit: "3mb"
}))


app.use('/assets', express.static(path.join(__dirname, "../public/")))


// loading the router
// app.use("/api/v1/", router);
// domain/ 
app.use(router);

// mobile api 
// domain/api/
app.use("/api", cors(), router)

// 404 
app.use((req: Request, res: Response, next: NextFunction) => {
  next({
    code: 404,
    message: "Route Not found",
  })
})


// error handling middleware
app.use(ErrorHandler)

export default app;