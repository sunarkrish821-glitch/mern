import { LuCog, LuShoppingBag, LuShoppingCart, LuUsers } from "react-icons/lu";
import logo from "../../assets/images/logo.png";
import { PageTitle } from "../../components/page-title/PageTitle";
import { Outlet } from "react-router";
import { useAuth } from "../../lib/provider/hook/auth-hook";
// import { useContext } from "react";
// import AuthContext from "../../context/AuthContext";

export default function AdminLayout() {
  // API Integrate

  // const {loggedInUser} = useContext(AuthContext)

  const {loggedInUser} = useAuth()
  console.log(loggedInUser)



    return (<>
     <section className="w-full h-screen flex bg-stone-50">
       <aside className="w-100 bg-gray-200 p-18 flex-col gap-5 flex" >
     <div className="flex flex-col items-center justify-center w-full">
          <img src={logo} alt="Logo" className="size-25 rounded-full" />
          <PageTitle pageTitle="Admin Panel" className="text-gray-950! text-shadow-lg whitespace-nowrap">Admin Panel</PageTitle>
          {/* <PageTitle pageTitle="Admin Panel" className="text-gray-950! text-shadow-lg">Admin Panel</PageTitle> */}
           {/* <PageTitle className="text-gray-950! text-shadow-lg">Admin Panel</PageTitle> */}
     </div>
        <nav>
         <ul className="flex flex-col gap-2">
            <li className="w-full bg-gray-100 p-2 shadow-lg rounded text-lg font-semibold">
               <a href="/admin" className="flex items-center justify-center gap-2">
                 <LuCog className="text-gray-700 size-6"/>
                Dashboard
               </a>
                </li>
            <li className="w-full bg-gray-100 p-2 shadow-lg rounded text-lg font-semibold ">
                <a href="/admin/products" className="flex items-center justify-center gap-2">
                  <LuShoppingBag className="text-gray-700 size-6"/>
                  Products
                </a>
                </li>
            <li className="w-full bg-gray-100 p-2 shadow-lg rounded text-lg font-semibold ">
                <a href="/admin/users" className="flex items-center justify-center gap-2">
                  <LuUsers className="text-gray-700 size-6"/>
                  Users
                </a>
                </li>
            <li className="w-full bg-gray-100 p-2 shadow-lg rounded text-lg font-semibold flex items-center justify-center gap-2">
                <a href="/admin/orders" className="flex items-center justify-center gap-2">
                  <LuShoppingCart className="text-gray-700 size-6"/>
                  Orders
                </a>
                </li>
         </ul>
        </nav>

       </aside>
       <section className="w-full flex flex-col">
        <header className="w-full flex p-5 bg-gray-200">
          <nav className="flex justify-end w-full">
            <ul>
              <li>
              Aditya Sinchuri
            </li>
            </ul>
          </nav>
        </header>
        <section className="p-5">
           <Outlet/>
        </section>
       </section>
     </section>
    </>)
}