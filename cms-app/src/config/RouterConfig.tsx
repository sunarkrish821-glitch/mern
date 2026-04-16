// import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "../pages/auth/Login";
import ForgetPasswordPage from "../pages/auth/ForgetPassword";
import { createBrowserRouter, RouterProvider } from "react-router";
import NotFound from "../pages/errors/NotFound";
import AdminLayout from "../pages/layouts/AdminLayout";


const router = createBrowserRouter([
    {path: "/", element: <LoginPage />},
    {path: "/forget-password", Component: ForgetPasswordPage},

    {path: "/admin", element: (<AdminLayout/>),children: [
       {index: true, element:<>Admin Dahboard</> },
    {path: "products", element: <>Admin Products</> },
    {path: "users", element: <>Admin Users</> },
    {path: "orders", element: <>Admin Orders</> },
     {path: "*", element: <NotFound url="/admin"/>},
    ]},

    


    // {
    //     path: "/admin",
    //     element: <AdminPage />,
    //     children: []

    // }


    // error routes

    {path: "*", element: <NotFound />}


])


export default function RouterConfig() {
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
    return <RouterProvider router={router}/>;
}