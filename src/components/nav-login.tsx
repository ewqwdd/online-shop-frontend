import React, { FC, Fragment } from "react";
import GreyButton from "../UI/grey-button/GreyButton";
import GreyButtonReverse from "../UI/greyButtonReverse/GreyButtonReverse";
import { useAppDispatch } from "../store/storeHooks";
import { modalSlice } from "../store/modalReducer";
import Register from "../pages/register";
import Login from "../pages/login";

const NavLogin: FC<{show: boolean}> = ({show})=>{
    let dispatch = useAppDispatch()

    let actions = modalSlice.actions

    let handleReg = ()=>{
        dispatch(actions.show({children: <Register />}))
    }

    let handleLog = ()=>{
        dispatch(actions.show({children: <Login />}))
    }

    return(
        <div className={`nav-buttons ${show ? "" : "nav-hide"}`}>
            <GreyButtonReverse onClick={handleReg}>Register</GreyButtonReverse>
            <GreyButton onClick={handleLog}>Login</GreyButton>
        </div>
    )
}

export default NavLogin;