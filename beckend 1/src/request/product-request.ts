import z from "zod";
export const ProductCreateDTO = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(20),
  category: z.string().nonempty(), // should be ObjectId string

  // price: z.number().min(1),
  // price: z.preprocess(val => Number(val), z.number().min(1)),
  price: z.preprocess((val) => Number(val), z.number().min(1)),

  discountPercentage: z.preprocess(
    (val) => Number(val),
    z.number().min(0).max(100).optional(),
  ),
  stock: z.preprocess((val) => Number(val), z.number().optional()),
  tags: z.array(z.string().nullable()).optional(),
  brand: z.string().optional(),
  weight: z.preprocess((val) => Number(val), z.number().optional()),
  dimensions: z
    .object({
      sizes: z.array(z.string()).optional(),
      width: z.preprocess((val) => Number(val), z.number().optional()),
      height: z.preprocess((val) => Number(val), z.number().optional()),
      depth: z.preprocess((val) => Number(val), z.number().optional()),
    })
    .optional(),
  warrantyInformation: z.string().optional(),
  shippingInformation: z.string().optional(),
  availabilityStatus: z
    .enum(["available", "low Stock", "not available"])
    .optional(),
  returnPolicy: z.string().optional(),
  minimumOrderQuantity: z.preprocess(
    (val) => Number(val),
    z.number().default(1).optional(),
  ),
});