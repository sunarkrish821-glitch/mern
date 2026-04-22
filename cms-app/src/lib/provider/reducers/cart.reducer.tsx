import { createSlice } from "@reduxjs/toolkit";

const CartSclice = createSlice({
    name: "cart",
    initialState: {
        cart: null,
    },
    reducers: {
        setCart(state, action) {
           // can never be async function, it is a pure function, it can only update the state, it cannot fetch data from api or do any side effect, it can only update the state based on the action payload
              console.log(state, state.cart)
              console.log(action)
               
        }
    }
})



export const { setCart } = CartSclice.actions;
export default CartSclice.reducer;