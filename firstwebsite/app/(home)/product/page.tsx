import Image from "next/image";
import Link from "next/link";
import { ProductGridItems } from "@/components/Product/ProductGridItems";
// import { Metadata } from "next";
// import { BASE_URL } from "@/lib/config/app";


// export const generatemetadata = async ():Promise<Metadata> =>{
//   const response = await fetch(BASE_URL+"product/1")
//   return {
//     title: response.product.title
//   } as Metadata
// }

export default function ProductList() {
  return (
    <>
      <div className="mx-auto w-full px-4 py-5 sm:px-6 lg:px-8 flex flex-col gap-5">
        <div className="w-full bg-teal-50 p-5 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-teal-900 sm:text-3xl">
            Products you might like
          </h2>
          <Link
            href={"/product"}
            className="text-lg font-semibold text-teal-900 flex items-center gap-2"
          >
            View All Products
            <Image
              src="/images/icons/arrow-right.svg"
              width={20}
              height={20}
              alt="arrow-right"
              className="size-5 text-teal-900"
            />
          </Link>
        </div>
        <ProductGridItems />
      </div>
    </>
  );
}