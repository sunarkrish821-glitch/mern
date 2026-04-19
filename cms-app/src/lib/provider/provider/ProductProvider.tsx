import {type ReactNode, useState } from "react";
import ProductContext from "../../../context/ProductContext";
import type { IProductDetail } from "../../../pages/products/ProductDetail";
import axiosInstance from "../../../config/apiClient";

export default function ProductProvider({children}:Readonly<{children : ReactNode}>) {
        const [productDetail, setProductDetail] = useState<IProductDetail>();

    const getProductDetail = async (productId: string) => {
       try  {
     const response = await axiosInstance.get("/products/"+productId) as IProductDetail
     setProductDetail(response);
       } catch(exception) {
        console.log(exception)
       }
    }

    return(
        <>
         <ProductContext.Provider value={{
            detail: productDetail,
            getProductDetail: getProductDetail,
         }}>
            {children}
            </ProductContext.Provider>
        </>
    )
}