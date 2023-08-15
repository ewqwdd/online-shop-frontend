import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { userSlice } from '../store/userReducer';
import useMessage from '../hooks/useMessage';


const NavLogout: FC = ()=>{

    const dispatch = useAppDispatch()
    let message = useMessage()
    let actions = userSlice.actions

    let isClicked = useAppSelector(state=>state.logoutReducer.show)

    

    const handleClick = ()=>{
        dispatch(actions.logout())
        message("Logged out", true)
    }

    return(
        <div onClick={handleClick} style={{display: isClicked ? "block" : "none"}} className="user-menu-elem">Log Out</div>
    )
}

export default NavLogout