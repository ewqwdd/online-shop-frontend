import { createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";

export interface messageStore{
    show: boolean;
    children: string;
    positive: boolean;
}

let initialState: messageStore = {
    show: false,
    children: "",
    positive: true,
}

export let messageSlice = createSlice({
    name: "messageSlice",
    initialState,
    reducers:{
        show(state, action){
            state.show = true
            state.children = action.payload.children
            state.positive = action.payload.positive
        },
        hide(state){
            state.show = false
        }
    }
}
)

export default messageSlice.reducer