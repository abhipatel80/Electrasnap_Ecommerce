import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getsingleproduct } from "../api/api";

const initialState = {
    singleproduct: [],
    loading: false
}

export const getsingleproAsync = createAsyncThunk(
    'product/getsingleproduct',
    async (id) => {
        const res = await getsingleproduct(id);
        return res.data;
    }
)

export const singleDetailSlice = createSlice({
    name: 'singleProduct',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getsingleproAsync.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getsingleproAsync.fulfilled, (state, action) => {
            state.loading = false
            state.singleproduct = action.payload
        })
    }
})

export default singleDetailSlice.reducer;
