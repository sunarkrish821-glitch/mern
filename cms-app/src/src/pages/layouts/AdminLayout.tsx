import { LuCog, LuShoppingBag, LuShoppingCart, LuUsers } from "react-icons/lu";
import logo from "../../assets/images/logo.png"
import { PageTitle } from "../../components/page-title/PageTitle";
import { NavLink, Outlet } from "react-router";
import { useAuth } from "../../lib/provider/hook/auth-hook";

export default function AdminLayout() {
  const {loggedInUser} = useAuth()

  return (
    <>
      <section className="w-full h-screen flex bg-stone-50">
        <aside className="w-100 bg-gray-200 p-10 flex-col gap-5 flex">
          <div className="flex flex-col items-center justify-center w-full">
            <img src={logo} alt="logo" className="size-25 rounded-full" />
            <PageTitle pageTitle="Admin Panel" className="...">Admin Panel</PageTitle>
          </div>

          <nav>
            <ul className="flex flex-col gap-2">
              <li className="rounded text-lg font-semibold shadow-lg w-full bg-gray-100 p-2">
                <NavLink className=" flex gap-2 items-center" to="/admin">
                  <LuCog className="text-gray-700 size-6" />
                  Dashboard
                </NavLink>
              </li>
              <li className="rounded text-lg font-semibold shadow-lg w-full bg-gray-100 p-2">
                <NavLink
                  to="/admin/products"
                  className="flex gap-2 items-center"
                >
                  <LuShoppingBag className="text-gray-700 size-6" />
                  Product
                </NavLink>
              </li>
              <li className="rounded text-lg font-semibold shadow-lg w-full bg-gray-100 p-2 flex gap-2 items-center">
                <LuUsers className="text-gray-700 size-6" />
                Users
              </li>
              <li className="rounded text-lg font-semibold shadow-lg w-full bg-gray-100 p-2 flex gap-2 items-center">
                <NavLink
                  to="/admin/order"
                  className={"flex gap-2 items-center"}
                >
                  <LuShoppingCart className="text-gray-700 size-6" />
                  Orders
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>
        <section className="w-full flex flex-col">
          <header className="w-full flex p-5 bg-gray-200">
            <nav className="flex justify-end w-full">
              <ul>
                <li className="flex items-center justify-center gap-3">
                  <img
                    // src={import.meta.env.VITE_APP_ASSETS_URL+"/uploads/user/"+loggedInUser?.image.filename}
                    src={loggedInUser?.image}
                    className="size-10 rounded-full"
                    crossOrigin="anonymous"
                  />
                  <p>
                    {loggedInUser?.firstName + " " + loggedInUser?.lastName}
                  </p>
                </li>
              </ul>
            </nav>
          </header>
          {/* Chagned and dynamic */}
          <section className="p-3">
            <Outlet />
          </section>
        </section>
      </section>
    </>
  );
}
// EOF