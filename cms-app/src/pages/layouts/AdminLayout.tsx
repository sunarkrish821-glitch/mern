import { LuCog, LuShoppingBag, LuShoppingCart, LuUsers } from "react-icons/lu";
import logo from "../../assets/images/logo.png";
import { PageTitle } from "../../components/page-title/PageTitle";
import { NavLink, Outlet } from "react-router";
import { useAuth } from "../../lib/provider/hook/auth-hook";

export default function AdminLayout() {
  const {loggedInUser} = useAuth()
  



    return (<>
     <section className="w-full h-screen flex bg-stone-50">
       <aside className="w-70 bg-gray-200 p-18 flex-col gap-5 flex" >
     <div className="flex flex-col items-center justify-center w-full">
          <img src={logo} alt="Logo" className="size-25 rounded-full" />
          <PageTitle pageTitle="Admin Panel" className="text-gray-950! text-shadow-lg whitespace-nowrap">Admin Panel</PageTitle>
          {/* <PageTitle pageTitle="Admin Panel" className="text-gray-950! text-shadow-lg">Admin Panel</PageTitle> */}
           {/* <PageTitle className="text-gray-950! text-shadow-lg">Admin Panel</PageTitle> */}
     </div>
        <nav>
         <ul className="flex flex-col gap-2">
            <li className="w-full bg-gray-100 p-2 shadow-lg rounded text-lg font-semibold">
               <NavLink to="/" className="flex items-center justify-center gap-2">
                 <LuCog className="text-gray-700 size-6"/>
                Dashboard
               </NavLink>
                </li>
            <li className="w-full bg-gray-100 p-2 shadow-lg rounded text-lg font-semibold ">
                <NavLink to="/admin/products" className="flex items-center justify-center gap-2">
                  <LuShoppingBag className="text-gray-700 size-6"/>
                  Products
                </NavLink>
                </li>
            <li className="w-full bg-gray-100 p-2 shadow-lg rounded text-lg font-semibold ">
                <NavLink to="/admin/users" className="flex items-center justify-center gap-2">
                  <LuUsers className="text-gray-700 size-6"/>
                  Users
                </NavLink>
                </li>
            <li className="w-full bg-gray-100 p-2 shadow-lg rounded text-lg font-semibold flex items-center justify-center gap-2">
                <NavLink to="/admin/orders" className="flex items-center justify-center gap-2">
                  <LuShoppingCart className="text-gray-700 size-6"/>
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
                 <img src={loggedInUser?.image} alt="" className="size-10 rounded-full"/>
                 <p>
                  {loggedInUser?.firstName + " " + loggedInUser?.lastName}
                 </p>
            </li>
            </ul>
          </nav>
        </header>
        <section className="p-3">
           <Outlet/>
        </section>
       </section>
     </section>
    </>)
}