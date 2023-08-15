import React, { FC, Fragment, MouseEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/storeHooks";
import { NavLink } from "react-router-dom";
import NavLogout from "./nav-logout";
import { logoutSlice } from "../store/logoutReducer";
const NavUser: FC<{show: boolean}> = ({show})=>{

    let user = useAppSelector(state=>state.userReducer.user) as string
    let role = useAppSelector(state=>state.userReducer.role) as string
    let isClicked = useAppSelector(state=>state.logoutReducer.show)
    let dispatch = useAppDispatch()
    let actions = logoutSlice.actions

   let handleClick: MouseEventHandler = (e)=>{
    e.stopPropagation()
    if(isClicked){
        return dispatch(actions.hide())
    }
    dispatch(actions.show())
    
   }

    return(
       <Fragment>
            <div className={`nav-right ${show ? "" : "nav-hide"}`}>
                <div className="user">
                    {role === "admin" ?
                    <NavLink className="basket-link" to="/admin/"> 
                        <div className="full-height">
                            <span>admin</span>
                        </div>
                    </NavLink>:
                    null}
                    <NavLink className="basket-link" to="/basket/">
                        <div className="full-height">
                            <div className="basket-nav" />
                        </div>
                    </NavLink>
                    <div onClick={handleClick} className="basket-link">
                        <div className="full-height">
                            <span className="user-name">{user}</span>
                        </div>
                    </div>
                </div>
                    <NavLogout />
                </div>
        </Fragment>
    )
}

export default NavUser;