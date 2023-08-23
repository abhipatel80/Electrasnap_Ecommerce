import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ""
}

const inputSlice = createSlice({
    name: 'Input',
    initialState,
    reducers: {
        input: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { input } = inputSlice.actions
export default inputSlice.reducer

