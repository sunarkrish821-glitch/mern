"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCreateDTO = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ProductCreateDTO = zod_1.default.object({
    title: zod_1.default.string().min(3).max(200),
    description: zod_1.default.string().min(20),
    category: zod_1.default.string().nonempty(), // should be ObjectId string
    // price: z.number().min(1),
    // price: z.preprocess(val => Number(val), z.number().min(1)),
    price: zod_1.default.preprocess((val) => Number(val), zod_1.default.number().min(1)),
    discountPercentage: zod_1.default.preprocess((val) => Number(val), zod_1.default.number().min(0).max(100).optional()),
    stock: zod_1.default.preprocess((val) => Number(val), zod_1.default.number().optional()),
    tags: zod_1.default.array(zod_1.default.string().nullable()).optional(),
    brand: zod_1.default.string().optional(),
    weight: zod_1.default.preprocess((val) => Number(val), zod_1.default.number().optional()),
    dimensions: zod_1.default
        .object({
        sizes: zod_1.default.array(zod_1.default.string()).optional(),
        width: zod_1.default.preprocess((val) => Number(val), zod_1.default.number().optional()),
        height: zod_1.default.preprocess((val) => Number(val), zod_1.default.number().optional()),
        depth: zod_1.default.preprocess((val) => Number(val), zod_1.default.number().optional()),
    })
        .optional(),
    warrantyInformation: zod_1.default.string().optional(),
    shippingInformation: zod_1.default.string().optional(),
    availabilityStatus: zod_1.default
        .enum(["available", "low Stock", "not available"])
        .optional(),
    returnPolicy: zod_1.default.string().optional(),
    minimumOrderQuantity: zod_1.default.preprocess((val) => Number(val), zod_1.default.number().default(1).optional()),
});
//# sourceMappingURL=product-request.js.map