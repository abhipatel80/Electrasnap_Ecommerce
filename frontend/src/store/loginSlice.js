import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout, register } from "../api/api";
import { toast } from "react-toastify";
import { url } from "../api/api";

const initialState = {
    error: null
}

export const getloginAsync = createAsyncThunk(
    'login/userlogin',
    async ({ email, password }) => {
        try {
            const res = await fetch(`${url}/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.status === 200) {
                localStorage.setItem("token", data.success)
                toast.success("You are Logged In", { autoClose: 2000 })
            };
            return data;
        } catch (e) {
            console.log(e);
            return e.response
        }
    }
)

export const getlogoutAsync = createAsyncThunk(
    'logout/userlogout',
    async () => {
        const res = await logout();
        if (res.status === 200) {
            localStorage.clear();
            toast.success("You are Logged Out", { autoClose: 2000 })
        }
    }
)

export const registerAsync = createAsyncThunk(
    'register/useregister',
    async (item) => {
        try {
            const { name, email, password, role } = item;
            const res = await register({ name, email, password, role });
            if (res.status === 201) {
                localStorage.setItem("token", res.data.success);
                toast.success("Registration Successful", { autoClose: 2000 })
            }
            return res.data
        } catch (e) {
            return e.response.data
        }
    }
)

export const loginSlice = createSlice({
    name: 'Login',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(registerAsync.fulfilled, (state, action) => {
            state.error = action.payload
        })
        builder.addCase(getloginAsync.fulfilled, (state, action) => {
            state.error = action.payload
        })
    }
});

export default loginSlice.reducer;
