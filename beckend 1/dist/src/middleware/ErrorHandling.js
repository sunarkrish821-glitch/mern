"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const ErrorHandler = (error, req, res, next) => {
    let code = error.code || 500;
    let detail = error.details || error.detail || null;
    let message = error.message || "Internal App Error";
    console.log(error);
    // manipulating Mongodb errors 
    if (error.name && error.name === 'MongoServerError') {
        // unique validation failed
        if (+error.code === 11000) {
            code = 400;
            detail = {};
            // {email:1} => ["email"]
            Object.keys(error.keyPattern).map((key) => {
                detail[key] = `${key} should be unique`;
            });
            message = "Validation Failed";
        }
    }
    // delete file if error 
    if (req.file && fs_1.default.existsSync(req.file.path)) {
        console.log(req.file);
        fs_1.default.unlinkSync(req.file.path);
    }
    // Todo: update 
    res.status(code).json({
        error: detail,
        message: message,
        status: false
    });
};
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=ErrorHandling.js.map