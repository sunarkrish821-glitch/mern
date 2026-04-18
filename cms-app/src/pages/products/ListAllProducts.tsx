import { NavLink } from "react-router"
import { PageTitle } from "../../components/page-title/PageTitle"
import { LuPlus } from "react-icons/lu"
import { useEffect, useState } from "react"
import { IoGridSharp } from "react-icons/io5"
import { FaThList } from "react-icons/fa"

// import { mockProduct } from "./data"
import SingleProductGridItem from "../../components/page-title/products/SingleProductGridItem"
import SingleProductSkeleton from "../../components/page-title/products/SingleProductSkeleton"
import axiosInstance from "../../config/apiClient"


         export interface IProductDetails {
 
  id: number,
  title: string,
  description: string,
  category: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  tags: string[],
  brand: string,
  sku: string,
  weight: number,
  dimensions: {
    width: number,
    height: number,
    depth: number
  },
  warrantyInformation: string,
  shippingInformation: string,
  availabilityStatus: string,
  reviews: [
    {
      rating: number,
      comment: string,
      date: string,
      reviewerName: string,
      reviewerEmail: string,
    }
  ],
  returnPolicy: string,
  minimumOrderQuantity: number,
  meta: {
    createdAt: string,
    updatedAt: string,
    barcode: string,
    qrCode: string,
  },
  thumbnail: string,
  images: string[],
}

export interface IProductListResponse {limit: number, products: Array<IProductDetails>, skip: number, total: number}

export default function ListAllProducts() {
    const [viewType, setViewType] = useState<string>("grid")

    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<Array<IProductDetails>>()


useEffect(() => {
    const getAllProducts = async() => {
        try {
            const response = await axiosInstance.get('/products', {
                params: {
                    limit: 40,
                    skip: 0,
                    select: "id,title,description,category,price,discountPercentage,rating,brand,thumbnail"
                }
            }) as IProductListResponse
            setProducts(response.products)
        } catch(exception) {
            console.log(exception)
        } finally {
            setLoading(false)
        }
    }
    getAllProducts()
}, [])




  //   const getAllProducts = async() => {
  //    try{
  //         const response = await axiosInstance.get('/products', {
  //           params: {
  //             limit: 40,
  //             skip: 0,
  //             select: "id,title,description,category,price,discountPercentage,rating,brand,thumbnail"
  //           }
  //         }) as IProductListResponse
  //        setLoading(false)
  //        setProducts(response.products)
  //    } catch(exception) {
  //       console.log(exception)
  //    }
  //   }
  // useEffect(() => {
  //    getAllProducts()
  // }, [])


    return(
    <section className= "bg-gray-100 flex flex-col gap-5 p-5">
        <div className="flex w-full justify-between">
           <PageTitle pageTitle="Products" className="...">Products</PageTitle>
            <div className="flex gap-2 w-2/3 justify-end">
                <input type="search"  
                className= "w-2/3 border-gray-200 shadow bg-gray-50 rounded-md p-2 " 
                placeholder="Enter your Search Keyword............."
                />
                <NavLink to={'/admin/product/create'} 
            className={'flex w-50 p-2 justify-center items-center bg-emerald-800 text-white text-lg rounded-full tramsition hover:underline hover:bg-emerald-900 hover:scale-98'}>
             <LuPlus/> Add Product
            </NavLink>
            </div>
        </div>

        <div className="w-full flex gap-2 justify-end">
            <span className="size-5"
            onClick={() => {
                setViewType("grid")
            }}>
                <IoGridSharp className="size-5"/>
            </span>
            <span className="size-5"
            onClick={() => {
                setViewType("list")
            }}>
                <FaThList className="size-5"/>
            </span>
        </div>

        <div className= {`grid ${viewType === 'grid' ? 'grid-cols-4' : 'grid-cols-1'} gap-2`}>
            {
              loading ?
              (
                [...Array(12)].map((_, index: number) => {
                  return <SingleProductSkeleton key={index}/>
                })
              ) : (
                products ? products.map((prod: IProductDetails, i: number) => {
               return<SingleProductGridItem product={prod} key={i}/>
                    
}) : <>No Products Found</>
              )
            }
        </div>
     
    </section>
    )
}



