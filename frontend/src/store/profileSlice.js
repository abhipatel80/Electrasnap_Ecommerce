import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../api/api";

const initialState = { error: "" };

let token = localStorage.getItem("token");
const headers = {
    'Content-Type': 'application/json',
    token,
};

export const profileAsync = createAsyncThunk(
    'profile/updateProfile',
    async (item) => {
        try {
            const { name, email, role } = item;
            const res = await fetch(`${url}/me/update`, {
                method: "PUT",
                headers,
                body: JSON.stringify({ name, email, role }),
            });
            const data = await res.json();
            return data;
        } catch (e) {
            return e.response.data
        }
    }
)

export const passwordAsync = createAsyncThunk(
    'password/updatePassword',
    async (item) => {
        try {
            const { oldpassword, newpassword, confirmpassword } = item;
            const res = await fetch(`${url}/password/update`, {
                method: "PUT",
                headers,
                body: JSON.stringify({ oldpassword, newpassword, confirmpassword }),
            });
            const data = await res.json();
            if (res.status === 200) {
                localStorage.setItem("token", data.success);
                return data.msg;
            };
            return data;
        } catch (e) {
            return e;
        }
    }
)

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(passwordAsync.fulfilled, (state, action) => {
            state.error = action.payload
        })
    }
})

export default profileSlice.reducer;
