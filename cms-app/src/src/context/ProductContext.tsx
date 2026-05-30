import { createContext } from "react";
import type { IProductDetail } from "../pages/products/ProductDetail";



export interface IProductContext{
    detail: undefined | IProductDetail,
    getProductDetail(productId: string): Promise<void|IProductDetail>;
}
const ProductContext = createContext<IProductContext>({
detail: undefined,
async getProductDetail() {}
})


export default ProductContext