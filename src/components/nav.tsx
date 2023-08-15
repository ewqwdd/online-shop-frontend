import React, { FC, useState } from "react";
import Brand from "../UI/nav-brand/Brand";
import NavElem from "../UI/nav-link/NavElem";
import { useAppSelector } from "../store/storeHooks";
import NavUser from "./nav-user";
import NavLogin from "./nav-login";
import Burger from "../UI/burger/burger";

const Nav: FC = ()=>{

    let [show, setShow] = useState<boolean>(true)

    let isLogged = useAppSelector(state=>state.userReducer.isLoged)
    return(
        <div className="nav">
            <div className="container nav-bar">
                <NavElem url="/shop"><Brand>SHOP</Brand></NavElem>
                <Burger onClick={()=>setShow(show ? false : true)}/>
                { isLogged ? <NavUser show={show}/> : <NavLogin show={show} /> }
            </div>

        </div>
    )
}

export default Nav;