import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/apiClient";
import type { IProductDetail } from "../../../pages/products/ProductDetail";

export interface ISingleCartItem{
    product: string, 
    id: number,
    unit?: number, 
    rate?: number
  }

export interface ISubmitCartArgs {
  cartItems: Array<ISingleCartItem>, 
  selectedUser: number
}

export interface ICartResponse {
  discountedTotal: number,
  id: number,
  products: Array<IProductDetail>
  total: number, 
  totalProducts: number,
  totalQuantity: number,
  userId: number
}

interface ICartState {
  cart: ICartResponse | null;
}


export const submitCart = createAsyncThunk("cart/submitCart", async(arg: ISubmitCartArgs) => {
  const response = await axiosInstance.post("/carts/add", {
    userId: arg.selectedUser,
    products: arg.cartItems.map((item: ISingleCartItem) => {
      return { id: Number(item.product), quantity: item.unit }
    })
  });
  return response as unknown as ICartResponse
});

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
  } as ICartState,
  reducers: {
    setCart(state, action) {
      // can never be an async function
      console.log(state, state.cart);
      console.log(action); // {type: "cart/setCart", payload: data}
    },
  },
  extraReducers: (builders) => {
    builders.addCase(submitCart.fulfilled, (state, action) => {
      state.cart = action.payload as ICartResponse
    });
    builders.addCase(submitCart.rejected, (state) => {
      state.cart = null
    })
  },
});

export const {setCart} = CartSlice.actions

export default CartSlice.reducer