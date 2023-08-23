import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { url } from "../api/api";

let token = localStorage.getItem("token");
const headers = {
    'Content-Type': 'application/json',
    token,
};

export const neworderAsync = createAsyncThunk(
    'order/newOrder',
    async ({ input, data, quantity, price, city, state, country }) => {
        const { username, address, phoneNo, pincode } = input;
        const { _id, name } = data;
        let images = data?.images[0].url;
        try {
            const res = await fetch(`${url}/order/new`, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    itemsPrice: price,
                    shippingPrice: 200,
                    totalPrice: price + 200,
                    orderItems: { product: _id, name, price, image: images, quantity },
                    shippingInfo: { name: username, address, phoneNo, pincode, state, city, country },
                }),
            });
            if (res.status === 201) {
                toast.success("Order Placed Successfully", { autoClose: 2000 })
            };
            const data = await res.json();
            return data;
        } catch (e) {
            return e
        }
    }
)

export const getorderAsync = createAsyncThunk(
    'order/getorder',
    async () => {
        const res = await fetch(`${url}/orders/me`, {
            method: "GET",
            headers,
        });
        const data = await res.json();
        return data;
    }
)

export const getsingleorderAsync = createAsyncThunk(
    'order/getsingleorder',
    async (id) => {
        const res = await fetch(`${url}/order/${id}`, {
            method: "GET",
            headers,
        });
        const data = await res.json();
        return data;
    }
)

export const cancelOrderAsync = createAsyncThunk(
    'order/cancelOrder',
    async (id) => {
        try {
            const res = await fetch(`${url}/order/cancel/${id}`, {
                method: "PUT",
                headers,
                body: JSON.stringify({ orderStatus: "Cancelled" })
            });
            if (res.status === 201) {
                toast.success("Order Cancelled", { autoClose: 2000 })
            };
        } catch (e) {
            return e;
        }
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderDetails: [],
        singleOrderDetails: [],
        error: null,
        loading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getorderAsync.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getorderAsync.fulfilled, (state, action) => {
            state.loading = false
            state.orderDetails = action.payload
        })
        builder.addCase(getsingleorderAsync.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getsingleorderAsync.fulfilled, (state, action) => {
            state.loading = false
            state.singleOrderDetails = action.payload
        })
        builder.addCase(neworderAsync.fulfilled, (state, action) => {
            state.error = action.payload
        })
    }
})

export default orderSlice.reducer;
