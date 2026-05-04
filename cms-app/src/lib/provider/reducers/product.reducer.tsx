import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/apiClient";
import type { IProductDetail } from "../../../pages/products/ProductDetail";

export interface IPaginationProps{
  limit?: number, skip?: number
}
// async redux management 
// thunk, saga
export const getAllProducts = createAsyncThunk("product/getAllProducts", 
  async(payload: IPaginationProps = {limit: 198, skip: 0}) => {
    const response = await axiosInstance.get('/product', {
      params: {
        limit: payload.limit,
        skip: payload.skip
      }
    });
    console.log({response})
    return response as unknown as { products: Array<IProductDetail>, skip: number, limit: number};
  });

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: null,
  } as {allProducts: Array<IProductDetail> | null},
  reducers: {
    // hello(state, action) {
    //   state.allProducts = action.payload
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload.products
    });
    builder.addCase(getAllProducts.rejected, (state) => {
      state.allProducts = null
    });
  }
})

// export const {hello} = ProductSlice.actions
export default ProductSlice.reducer