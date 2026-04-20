// import { useState } from "react";
import { useParams } from "react-router";
import { useProduct } from "../../lib/provider/hook/product-hook";
import { useEffect } from "react";
import SingleProductDetail from "./SingleProductDetail";
// import ProductContext from "../../context/ProductContext";



export interface IproductDimensionAttribute {
     width: number, height: number, depth: number,
}
export interface IProductReview{
      rating: number,
      comment: string,
      date: string,
      reviewerName: string,
      reviewerEmail: string,
    
}

export interface IProductMetaAttribute{
     createdAt: string,
    updatedAt: string,
    barcode: string,
    qrCode: string,
}

export interface IProductDetail {
  id: number,
  title: string,
  description: string,
  category: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  tags: Array<string>
  brand: string,
  sku: string,
  weight: number
  dimensions: IproductDimensionAttribute,
  warrantyInformation: string,
  shippingInformation: string,
  availabilityStatus: string,
  reviews: Array<IProductReview>,
  returnPolicy: string,
  minimumOrderQuantity: number,
  meta: IProductMetaAttribute,
  images: Array<string>,
  thumbnail: string
}

export default function ProductDetail() {
  // product param
  const params = useParams() as { productId: string };
  const {detail, getProductDetail} = useProduct()

  useEffect(() => {
     getProductDetail(params.productId)
  }, [params, getProductDetail])
  return (<>
  {
    detail ? <>
    <SingleProductDetail product={detail}/>
    </>: <>Loading.....</>
  }
  </>);
}
