import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/apiClient";
import type { IProductDetail } from "../../../pages/products/ProductDetail";

export interface IPaginationProps {
    limit?: number, skip?: number
}

// async redux management
// thunk is a middleware that allows us to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.
// saga is a middleware that allows us to manage side effects in our application. It uses generator functions to create sagas that can listen for actions and perform asynchronous tasks. Sagas can be used to handle complex logic, such as making API calls, and can be easily tested.

export const getAllProducts = createAsyncThunk('product/getAllProducts', async (payload: IPaginationProps ={limit: 198, skip: 0}) => {
    const response = await axiosInstance.get('/products', {
        params: {
            limit: payload.limit,
            skip: payload.skip,
        }
    });
    console.log({response})
    return response as unknown as {products: Array<IProductDetail>, total: number, skip: number, limit: number};
});



const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        allProducts: null,
} as {allProducts: Array<IProductDetail> | null},
    reducers: {
       hello(state, action) {
     state.allProducts = action.payload
       }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            // set products state
            state.allProducts = action.payload.products;
        });
        builder.addCase(getAllProducts.rejected, (state) => {
            // set error state
                state.allProducts = null;
        });
    }

});


// export const { getAllProducts } = ProductSlice.actions;
export default ProductSlice.reducer;