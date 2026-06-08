"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const healthCheck = (req, res, next) => {
    // res.end("Hello world")
    res.json({
        data: "Health Ok",
        message: "Success",
        meta: null,
    });
};
exports.healthCheck = healthCheck;
//# sourceMappingURL=TestController.js.map