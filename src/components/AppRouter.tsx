import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Register from "../pages/register"
import Login from "../pages/login"
import Items from "../pages/items"
import ItemFullPage from "../pages/ItemFullPage"
import Basket from "../pages/basket"
import Nav from "./nav"
import { FC } from "react"
import Modal from "./Modal"
import Message from "./Message"
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
        </BrowserRouter>
    
    )
}

export default AppRouter;