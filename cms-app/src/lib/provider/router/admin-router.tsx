import { lazy } from "react";
import CheckLogin from "../../../components/page-title/auth/CheckLogin";
import ProductProvider from "../provider/ProductProvider";

const AdminLayout = lazy(async() => await import("../../../pages/layouts/AdminLayout"))
import ListAllProducts from "../../../pages/products/ListAllProducts";
import ProductDetail from "../../../pages/products/ProductDetail";
import CreateOrder from "../../../pages/order/CreateOrder";
import NotFound from "../../../pages/errors/NotFound";
import ListOrder from "../../../pages/order/ListOrder";
import UserList from "../../../pages/users/UserList";
import ChatBox from "../../../pages/chat/ChatBox";

export const AdminRouter = [
  {
    path: "/admin",
    element: (
      <CheckLogin allowed={"admin"}>
        <AdminLayout />
      </CheckLogin>
    ),
    children: [
      { index: true, element: <>Admin Dashboard</> },

      // CRUD operations
      {
        path: "products",
        element: (
          <ProductProvider>
            <ListAllProducts />
          </ProductProvider>
        ),
      },
      {
        path: "product/:productId/detail",
        element: (
          <ProductProvider>
            <ProductDetail />
          </ProductProvider>
        ),
      },
      { path: "order", element: <ListOrder /> },
      { path: "order/create", element: <CreateOrder />},
      { path: "users", element: <UserList />},
      { path: "chat/:userId", element: <ChatBox />},
      { path: "*", element: <NotFound url="/admin" /> },
    ],
  },
];