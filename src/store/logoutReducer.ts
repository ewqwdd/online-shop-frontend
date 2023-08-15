import { createSlice } from "@reduxjs/toolkit";

export interface logoutStore{
    show: boolean;
}

let initialState: logoutStore = {
    show: false,
}

export let logoutSlice = createSlice({
    name: "logoutSlice",
    initialState,
    reducers:{
        show(state){
            state.show = true
        },
        hide(state){
            state.show = false
        }
    }
}
)

export default logoutSlice.reducer