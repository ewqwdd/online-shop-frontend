import React, { FC, useState } from 'react';
import classes from './NavElem.module.css'
import { NavLink } from 'react-router-dom';


const NavElem: FC<React.PropsWithChildren<{url: string}>> = ({children, url})=>{

    let [isClicked, setIsClicked] = useState(false)

    return(
        <NavLink onMouseDown={()=>{setIsClicked(true)}} 
        onMouseOut={()=>{setIsClicked(false)}} 
        to={url} 
        style={isClicked ? {background: "#4c4c4c"} : {}}
        className={({ isActive, isPending }) =>
        isPending ? classes.pending : isActive ? classes.active : ""
        }>
            {children}
        </NavLink>
    )
}

export default NavElem