import { Router } from "express";
import ProductController from "../controller/ProductController";
import uploader from "../middleware/Uploader";
import AuthCheck from "../middleware/Auth";
import { bodyValidator } from "../middleware/Validator";
import { ProductCreateDTO } from "../request/product-request";
// import { bodyValidator } from "../middleware/Validator";

const productRouter = Router()
const productCtrl = new ProductController()

// .none() => if content-type is multipart/form-data but no file upload
// .single(nameOfFileUploadingField) => if content-type if multipart/form-data and a field has a single file upload
// .array(nameOfFileUploadingField, maxCount) 
// .fields([{name: FieldName, maxCount: number}])

// localhost:9005/products/categories
productRouter.get("/categories", AuthCheck(['admin']), productCtrl.getAllCategories)
// localhost:9005/products/home
productRouter.get("/home", productCtrl.getAllProducts);
productRouter.get("/:productSlug/home", productCtrl.homeGetProductDetailBySlug);


// localhost:9005/products
productRouter.post("/",AuthCheck(['admin']),uploader("/products").fields([
    {name: "thumbnail", maxCount: 1},
    {name: "images", maxCount: 10}
  ]),
  bodyValidator(ProductCreateDTO),
  productCtrl.createProduct,
);
// localhost:9005/products
productRouter.get("/", AuthCheck(["admin"]), productCtrl.getAllProductsByUser);
productRouter.get("/:productSlug", AuthCheck(['admin']), productCtrl.getProductDetailBySlug);
productRouter.put(
  "/:productSlug",
  AuthCheck(["admin"]),
  uploader("/products").fields([
    { name: "images", maxCount: 10 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  bodyValidator(ProductCreateDTO),
  productCtrl.updateProduct
);

export default productRouter;