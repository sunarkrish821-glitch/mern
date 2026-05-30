'use client'; 

import Link from "next/link";
import Image from "next/image";
import { BrandListGrid } from "./BrandListGrid";
// import { BrandListGrid } from "@/components/Brand/BrandListGrid";

export default function BrandGrid() {
  const brandData = [
    {
        
    }
  ]
  return (
    <>
      <div className="mx-auto w-full px-4 py-5 sm:px-6 lg:px-8 flex flex-col gap-5">
        <div className="w-full bg-amber-900/10 p-5 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-amber-900 sm:text-3xl">
            Brand Picked for you
          </h2>
          <Link href={"/brand"} className="text-lg font-semibold text-teal-900 flex items-center gap-2">
            View All Brands
            <Image src='/images/icons/arrow-right.svg' width={20} height={20} alt="arrow-right" className="size-5 text-teal-900" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg *:bg-gray-100 md:grid-cols-8">
          <BrandListGrid />
        </div>
      </div>
    </>
  );
}