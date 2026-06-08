"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router/router"));
const ErrorHandling_1 = require("./middleware/ErrorHandling");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = require("express-rate-limit");
const path_1 = __importDefault(require("path"));
// mongodb connect 
require("./config/mongodb");
// sql import 
require("./config/sqldb");
// express application
const app = (0, express_1.default)(); // server-side application
// security
// CORS (Cross origin Reference Site)
app.use((0, cors_1.default)());
// helmet 
app.use((0, helmet_1.default)({
    xXssProtection: true
}));
const limiter = (0, express_rate_limit_1.rateLimit)({
    limit: 150,
    windowMs: 300000
});
app.use(limiter);
// built in middlewares 
// parsers 
app.use(express_1.default.json({
    limit: "3mb"
})); // json parsing
app.use(express_1.default.urlencoded({
    limit: "3mb"
}));
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, "../public/")));
// app.use("/assets", express.static(path.join(process.cwd(), "public")));
// loading the router
// app.use("/api/v1/", router);
// domain/ 
app.use(router_1.default);
// mobile api 
// domain/api/
app.use("/api", (0, cors_1.default)(), router_1.default);
// 404 
app.use((req, res, next) => {
    next({
        code: 404,
        message: "Route Not found",
    });
});
// error handling middleware
app.use(ErrorHandling_1.ErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map