import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../api/api";

const initialState = { error: "" }

export const resetpassAsync = createAsyncThunk(
    'reset/resetPassword',
    async (item) => {
        try {
            const { password, confirmpassword } = item.input;
            const resetoken = item.resetoken;
            const res = await fetch(`${url}/password/reset/${resetoken}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, confirmpassword })
            });
            const data = await res.json();
            if (res.status === 200) {
                localStorage.setItem("token", data.success)
            };
            return data;
        } catch (e) {
            return e.response.data
        }
    }
)

const resetSlice = createSlice({
    name: 'reset',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(resetpassAsync.fulfilled, (state, action) => {
            state.error = action.payload
        })
    }
})

export default resetSlice.reducer;
