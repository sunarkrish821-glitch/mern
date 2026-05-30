import ProductService from "@/lib/service/product-service";
import { Metadata } from "next"
import { SingleProductItem } from "@/components/Product/SingleProductItem"  // ✅ import

interface IProductDetailProps{
  params: Promise<{productId: string}>
}

export const generateMetadata = async ({params}: IProductDetailProps): Promise<Metadata> => {
  const {productId} = await params;
  const productDetail = await ProductService.getProductDetailById(productId)
  return {
    title: productDetail.title,
    description: productDetail.description,
    openGraph: {
      title: productDetail.title,
      description: productDetail.description,
      images: [productDetail.thumbnail],
      type: "article"
    },
  };
}

export default async function ProductDetail({params}: Readonly<IProductDetailProps>) {
  const parameter = await params
  const productDetail = await ProductService.getProductDetailById(parameter.productId);

  return (
    <>
      <SingleProductItem detail={productDetail}/>  {/* ✅ use component */}
    </>
  )
}