import { createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";
export interface modalStore{
    show: boolean;
    children: ReactNode | null;
}


let initialState: modalStore = {
    show: false,
    children: null
}

export let modalSlice = createSlice({
    name: "modalSlice",
    initialState,
    reducers:{
        show(state, action){
            state.show = true
            state.children = action.payload.children
        },
        hide(state){
            state.show = false
            state.children = null
        }
    }
}
)

export default modalSlice.reducer