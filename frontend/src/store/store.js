import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cateProductSlice from "./cateProductSlice";
import singleDetailSlice from "./singleDetailSlice";
import inputSlice from "./inputSlice";
import { searchapi } from "./searchSlice";
import cartSlice from "./cartSlice";
import loginSlice from "./loginSlice";
import forgetSlice from "./forgetSlice";
import resetpasswordSlice from "./resetpasswordSlice";
import profileSlice from "./profileSlice";
import userSlice from "./userSlice";
import orderSlice from "./orderSlice";

const store = configureStore({
    reducer: {
        [searchapi.reducerPath]: searchapi.reducer,
        product: productSlice,
        cateproduct: cateProductSlice,
        singleproduct: singleDetailSlice,
        input: inputSlice,
        cart: cartSlice,
        login: loginSlice,
        forget: forgetSlice,
        reset: resetpasswordSlice,
        profile: profileSlice,
        user: userSlice,
        order: orderSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(searchapi.middleware),
})

export default store;
