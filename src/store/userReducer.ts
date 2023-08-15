import { createSlice } from "@reduxjs/toolkit";
export interface userStore{
    isLoged: boolean;
    user: any;
    token: string;
    role: null | 'admin' | 'user'
}


let initialState: userStore = {
    isLoged: false,
    user: null,
    token: '',
    role: null,
}

export let userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers:{
        login(state, action){
            let {token, username, role} = action.payload
            state.token = token
            state.isLoged = true
            state.user = username
            state.role = role
            localStorage.setItem("token", action.payload.token);
        },
        logout(state){
            state.isLoged=false
            state.token = ''
            state.user = null
            state.role = null
            localStorage.removeItem("token")
        }
    }
}
)

export default userSlice.reducer