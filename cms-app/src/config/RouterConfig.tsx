// import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "../pages/auth/Login";
import ForgetPasswordPage from "../pages/auth/ForgetPassword";
import { createBrowserRouter, RouterProvider } from "react-router";
import NotFound from "../pages/errors/NotFound";
import AdminLayout from "../pages/layouts/AdminLayout";
import CheckLogin from "../components/page-title/auth/CheckLogin";
import ListAllProducts from "../pages/products/ListAllProducts";
import ProductDetail from "../pages/products/ProductDetail";
import ProductProvider from "../lib/provider/provider/ProductProvider";


const router = createBrowserRouter([
    {path: "/", element: <LoginPage />},
    {path: "/forget-password", Component: ForgetPasswordPage},

    {path: "/admin", 
    element: (
    <CheckLogin allowed={'admin'}>
        <AdminLayout/>
    </CheckLogin>),
    children: [
       {index: true, element:<>Admin Dahboard</> },
    
    //     CRUD Operation
    {path: "products", element:(
    <ProductProvider> 
    <ListAllProducts/>
    </ProductProvider>) },
    {path: "product/:productId/detail", element:(
    <ProductProvider>
       <ProductDetail/>
    </ProductProvider>
)},
    {path: "users", element: <>Admin Users</> },
    {path: "orders", element: <>Admin Orders</> },
     {path: "*", element: <NotFound url="/admin"/>},
    ]},

    {path: "/user", element: <CheckLogin allowed="user">
        <>User Layout</>
    </CheckLogin>},


        {path: "*", element: <NotFound />}
])
export default function RouterConfig() {
 return <RouterProvider router={router}/>;
}
    


    // {
    //     path: "/admin",
    //     element: <AdminPage />,
    //     children: []

    // }


    // error routes







    // // Declarative mode of routing
    // return (
    //     <>
    //    <BrowserRouter>
    //        <Routes>
    //             <Route path="/" element={<LoginPage/>} />
    //             <Route path="/forget-password" Component={ForgetPasswordPage} />
    //        </Routes>
    //    </BrowserRouter>
    //     </>
    // );



    // Data Mode of routing
   