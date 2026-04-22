
import { lazy } from "react";
import CheckLogin from "../../../components/page-title/auth/CheckLogin"
import ProductProvider from "../provider/ProductProvider";
import ListAllProducts from "../../../pages/products/ListAllProducts";
import ProductDetail from "../../../pages/products/ProductDetail";
import NotFound from "../../../pages/errors/NotFound";
import CreateOrder from "../../../pages/order/CreateOrder";
import ListOrder from "../../../pages/order/ListOrder";

// eslint-disable-next-line react-refresh/only-export-components
const AdminLayout = lazy(async() => await import("../../../pages/layouts/AdminLayout"));

export const AdminRouter = [
    {path: "/admin", element: (<CheckLogin allowed={'admin'}>
        <AdminLayout/>
    </CheckLogin>
    ),
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
    // {path: "users", element: <>Admin Users</> },
    {path: "orders", element: <ListOrder/> },
    {path: "orders/create", element: <CreateOrder/> },
     {path: "*", element: <NotFound url="/admin"/>},
    ]},
]