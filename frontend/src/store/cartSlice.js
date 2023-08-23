import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { url } from "../api/api";

const initialState = {
    cartdata: [],
    singlecart: {},
    loading: false,
};

let token = localStorage.getItem("token");
const headers = {
    'Content-Type': 'application/json',
    token,
};

export const cartAsync = createAsyncThunk(
    'cart/addcart',
    async (items) => {
        try {
            let images = items?.images[0].url;
            const { _id, name, price, category, seller } = items;
            let res = await fetch(`${url}/cart`, {
                method: "POST",
                headers,
                body: JSON.stringify({ product: _id, name, price, category, seller, images }),
            });
            if (res.status === 201) {
                toast.success("Product Added to Cart", { autoClose: 2000 })
            };
            let data = await res.json();
            return data
        } catch (e) {
            return e.response.data
        }
    }
)

export const getcartAsync = createAsyncThunk(
    'cart/getcart',
    async () => {
        try {
            let res = await fetch(`${url}/cart`, {
                method: "GET",
                headers,
            });
            let data = await res.json();
            return data;
        } catch (e) {
            return e.response.data;
        }
    }
)

export const editcartAsync = createAsyncThunk(
    'cart/editcart',
    async ({ cartId: id, quantity }) => {
        try {
            const res = await fetch(`${url}/cart/${id}`, {
                method: "PUT",
                headers,
                body: JSON.stringify({ quantity }),
            });
            const data = await res.json();
            return data;
        } catch (e) {
            console.log(e.message);
            return e;
        }
    }
)

export const deletecartAsync = createAsyncThunk(
    'cart/deletecart',
    async (id) => {
        const res = await fetch(`${url}/cart/${id}`, {
            method: "DELETE",
            headers,
        });
        if (res.status === 201) {
            toast.success("Product Removed from Cart", { autoClose: 2000 })
        };
    }
)

const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        increaseQuantity: (state, action) => {
            state = state.cartdata.filter((val) => {
                if (val.product._id === action.payload) {
                    if (val.quantity < 5) {
                        val.quantity += 1;
                    }
                }
                return state.cartdata;
            });
        },
        decreaseQuantity: (state, action) => {
            state = state.cartdata.filter((val) => {
                if (val.product._id === action.payload) {
                    if (val.quantity > 1) {
                        val.quantity -= 1;
                    }
                }
                return state.cartdata;
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getcartAsync.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getcartAsync.fulfilled, (state, action) => {
            state.loading = false
            state.cartdata = action.payload
        })
        builder.addCase(editcartAsync.fulfilled, (state, action) => {
            state.singlecart = action.payload
        })
    }
});

export const { increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
