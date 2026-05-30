import { BASE_URL } from "../config/app"
import { IProductDetail, IProductListResponse } from "../types/Product"


class ProductService {
  static async getAllProducts() {
    try {
      const response = await fetch(BASE_URL+'product')
      const data = await response.json() as IProductListResponse
      return data.products
    } catch(exception) {
      console.log(exception)
      throw exception
    }
  }

  static async getProductDetailById(id: string): Promise<IProductDetail> {
    try {
      const response = await fetch(BASE_URL + "product/" + id);
      const productDetail = await response.json();
      return productDetail as IProductDetail;
    } catch(exception) {
      console.log(exception)
      throw exception
    }
  }
}

export default ProductService