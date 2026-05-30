import { SingleProductItem } from "./SingleProductItem";
import { IProductDetail } from "@/lib/types/Product";
import ProductService from "@/lib/service/product-service";

export const ProductGridItems = async () => {
  const products = await ProductService.getAllProducts()

  return (
    <>
      <section className="bg-gray-50 py-8 antialiased md:py-12">
        <div className="mx-auto w-full px-4 2xl:px-0">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {products &&
              products.map((row: IProductDetail, i: number) => {
                return <SingleProductItem key={i} detail={row} />;
              })}
          </div>
        </div>
      </section>
    </>
  );
}