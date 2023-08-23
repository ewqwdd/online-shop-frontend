import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userReducer'
import { itemsApi } from "../api/itemsApi";
import { basketApi } from "../api/basketApi";
import modalReducer from "./modalReducer";
import logoutReducer from "./logoutReducer";
import messageReducer from "./messageReducer";
import basketPriceReducer from "./basketPricesReducer";
import { usersApi } from "../api/usersApi";
import itemEditReducer from "./itemEditReducer";



let rootReducer = combineReducers({
    userReducer,
    modalReducer,
    logoutReducer,
    messageReducer,
    basketPriceReducer,
    itemEditReducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [basketApi.reducerPath]: basketApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer
})

let store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemsApi.middleware).concat(basketApi.middleware).concat(usersApi.middleware)
    
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
