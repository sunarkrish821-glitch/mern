// import { BrowserRouter, Route, Routes } from "react-router";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";

import LoginPage from "../pages/auth/Login";
import ForgetPasswordPage from "../pages/auth/ForgetPassword";
import NotFound from "../pages/errors/NotFound";
import CheckLogin from "../components/page-title/auth/CheckLogin";
import UserList from "../pages/users/UserList";
// import AdminLayout from "../pages/layouts/AdminLayout";
// import ListAllProducts from "../pages/products/ListAllProducts";
// import ProductProvider from "../lib/provider/ProductProvider";
// import CreateOrder from "../pages/order/CreateOrder";

// import ProductDetail from "../pages/products/ProductDetail";
import { AdminRouter } from "../lib/provider/router/admin-router";
import ChatBox from "../pages/chat/ChatBox";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/forget-password", Component: ForgetPasswordPage },

  ...AdminRouter,

  {
    path: "/user",
    element: (
      <CheckLogin allowed="user">
        <Outlet />
      </CheckLogin>
    ),
    children: [
      { index: true, element: <UserList /> },
      { path: "chat/:userId", element: <ChatBox /> },
    ],
  },

  // error routes
  { path: "*", element: <NotFound /> },
]);

export default function RouterConfig() {
  
  // Declarative Mode
  // return (<>
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<LoginPage />} />
  //       <Route path="/forget-password" Component={ForgetPasswordPage} />
  //     </Routes>
  //   </BrowserRouter>
  // </>)
  // Data Mode
  return <RouterProvider router={router} />;
}