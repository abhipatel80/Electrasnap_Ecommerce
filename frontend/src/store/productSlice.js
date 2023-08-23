import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getallproducts, { getrateproducts } from "../api/api";

const initialState = {
    products: [],
    rateProducts: [],
    loading: false,
    page: 1,
}

export const getproductsAsync = createAsyncThunk(
    'product/getproducts',
    async (page) => {
        const res = await getallproducts(page);
        return res.data;
    }
)

export const rateproductsAsync = createAsyncThunk(
    'product/rateproduct',
    async (page) => {
        const res = await getrateproducts(page);
        return res.data;
    }
)

export const productSlice = createSlice({
    name: 'Product',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getproductsAsync.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getproductsAsync.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })
        builder.addCase(rateproductsAsync.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(rateproductsAsync.fulfilled, (state, action) => {
            state.loading = false
            state.rateProducts = action.payload
        })
    }
})

export default productSlice.reducer;
