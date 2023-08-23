import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { url } from "../api/api";

let token = localStorage.getItem("token");
const headers = {
    'Content-Type': 'application/json',
    token,
};

export const addreviewAsync = createAsyncThunk(
    'review/addReview',
    async (item) => {
        try {
            const { comment, productId, rating } = item;
            const res = await fetch(`${url}/review`, {
                method: 'PUT',
                headers,
                body: JSON.stringify({ rating, comment, productId })
            });
            if (res.status === 201) {
                toast.success("Review Submited", { autoClose: 2000 })
            };
            let data = await res.json();
            return data;
        } catch (e) {
            return e.response.data
        }
    }
)

export const delreviewAsync = createAsyncThunk(
    'review/deleteReview',
    async (ID) => {
        let id = ID.reviewid;
        let productid = ID.id;
        try {
            const res = await fetch(`${url}/reviews?id=${id}&productid=${productid}`, {
                method: 'DELETE',
                headers,
            });
            if (res.status === 201) {
                toast.success("Your Review Removed Successfully", { autoClose: 2000 })
            };
            let data = await res.json();
            return data;
        } catch (e) {
            return e.response.data
        }
    }
)
