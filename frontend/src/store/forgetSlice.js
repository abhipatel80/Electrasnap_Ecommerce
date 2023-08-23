import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../api/api";

const initialState = {
    error: ""
};

export const forgetAsync = createAsyncThunk(
    'forget/forgetPassword',
    async (item) => {
        try {
            const email = item;
            const res = await fetch(`${url}/password/forget`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            })
            let data = await res.json();
            return data;
        } catch (e) {
            return e.response.data;
        }
    }
)

const forgetSlice = createSlice({
    name: 'forget',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(forgetAsync.fulfilled, (state, action) => {
            state.error = action.payload
        })
    }
})

export default forgetSlice.reducer;
