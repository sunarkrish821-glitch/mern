"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCreateDTO = void 0;
const zod_1 = __importDefault(require("zod"));
exports.BlogCreateDTO = zod_1.default.object({
    title: zod_1.default.string().min(3).max(200),
    summary: zod_1.default.string().min(10),
    description: zod_1.default.string().min(20),
    category: zod_1.default.enum(["Technology", "Health", "Lifestyle", "Education", "Other"]),
    status: zod_1.default.enum(["draft", "published"]).optional().default("draft"),
});
//# sourceMappingURL=blog-request.js.map