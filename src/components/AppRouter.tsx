import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Register from "../pages/register"
import Login from "../pages/login"
import Items from "../pages/items"
import ItemFullPage from "../pages/ItemFullPage"
import Basket from "../pages/basket"
import Nav from "./nav"
import { FC, MouseEventHandler } from "react"
import Modal from "./Modal"
import { useAppDispatch, useAppSelector } from "../store/storeHooks"
import { logoutSlice } from "../store/logoutReducer"
import Message from "./Message"
import { basketApi } from "../api/basketApi"
import Admin from "../pages/admin"

const AppRouter: FC = ()=>{

    return(
        <BrowserRouter>
        <Modal />
        <Nav />
        <Message />
        <div className='container'>
            <Routes>
                <Route path="/" element={<Navigate to="/shop" />}/>
                <Route path="/register" Component={Register}/>
                <Route path="/login" Component={Login}/>
                <Route path="/shop" Component={Items}/>
                <Route path="/shop/:name" Component={ItemFullPage}/>
                <Route path="/basket" Component={Basket}/>
                <Route path="/admin" Component={Admin}/>
            </Routes>
        </div>
        {/* <div>Icons made from <a href="https://www.onlinewebfonts.com/icon">svg icons</a>is licensed by CC BY 4.0</div> */}
        </BrowserRouter>
    
    )
}

export default AppRouter;