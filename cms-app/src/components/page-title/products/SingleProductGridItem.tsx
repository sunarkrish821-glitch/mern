import { NavLink } from "react-router";
import type { IProductDetail } from "../../../pages/products/ProductDetail";

export default function SingleProductGridItem({
  product,
}: Readonly<{ product: IProductDetail }>) {
  return (
    <NavLink
      to={"/admin/product/" + product.id + "/detail"}
      className="group relative overflow-hidden block border border-gray-200 shadow"
    >
      <button className="absolute inset-e-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
        <span className="sr-only">Wishlist</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          ></path>
        </svg>
      </button>

      <img
        src={product.thumbnail}
        alt=""
        crossOrigin="anonymous"
        className="h-64 w-full shadow-lg transition duration-500 group-hover:scale-105 sm:h-72 bg-gray-400"
      />

      <div className="relative border border-gray-100 bg-gray-50 p-6">
        <p className="text-gray-700">
          {
            Intl.NumberFormat('np', {style: "currency", currency: "Npr"}).format(product.afterDiscount/100)
          }
          {product.discountPercentage ? (
            <span className="text-gray-400 ms-1 line-through">
              Npr. {product.price}
            </span>
          ) : (
            <></>
          )}
        </p>

        <h3 className="mt-1.5 text-xl  text-teal-900 font-semibold">
          {product.title}
        </h3>

        <p className="mt-1.5 line-clamp-3 text-gray-700">
          {product.description}
        </p>

        <form className="mt-4 flex gap-4">
          <button className="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105">
            Add to Cart
          </button>

          <button
            type="button"
            className="block w-full rounded-sm bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
          >
            Buy Now
          </button>
        </form>
      </div>
    </NavLink>
  );
}