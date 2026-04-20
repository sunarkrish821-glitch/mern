import { createSlice } from "@reduxjs/toolkit";

const CartSclice = createSlice({
    name: "cart",
    initialState: {
        cartItems: null,
    },
    reducers: {
        addToCart: (state, action) => {
           // can never be async function, it is a pure function, it can only update the state, it cannot fetch data from api or do any side effect, it can only update the state based on the action payload
              state.cartItems = action.payload;
              
        }
    }
})



export const { addToCart } = CartSclice.actions;
export default CartSclice.reducer;