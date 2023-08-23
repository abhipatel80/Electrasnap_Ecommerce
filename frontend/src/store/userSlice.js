import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../api/api";

const initialState = {
    userData: [],
    loading: false,
};

let token = localStorage.getItem("token");
const headers = {
    'Content-Type': 'application/json',
    token,
}

export const userAsync = createAsyncThunk(
    'user/getuser',
    async () => {
        try {
            const res = await fetch(`${url}/user`, {
                method: "GET",
                headers,
            });
            const data = await res.json();
            return data.user;
        } catch (e) {
            return e.response.data;
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(userAsync.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(userAsync.fulfilled, (state, action) => {
            state.loading = false
            state.userData = action.payload
        })
    }
});

export default userSlice.reducer;
