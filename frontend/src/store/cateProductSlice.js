import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getcateproducts } from "../api/api";

const initialState = {
    loading: false,
    cateproducts: [],
    page: 1,
}

export const cateproductAsync = createAsyncThunk(
    'product/cateproduct',
    async (category, page) => {
        try {
            const res = await getcateproducts(category, page);
            return res.data;
        } catch (e) {
            return e.response.data;
        }
    }
)

export const cateproductSlice = createSlice({
    name: 'cateproduct',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(cateproductAsync.pending, (state) => {
            state.loading = true
        })
        builder.addCase(cateproductAsync.fulfilled, (state, action) => {
            state.loading = false
            state.cateproducts = action.payload
        })
    }
})

export default cateproductSlice.reducer;
