import React, { ButtonHTMLAttributes, FC, useState } from 'react';
import classes from './RedButton.module.css'

interface RedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
  }

const RedButton: FC<RedButtonProps> = (props)=>{

    let [isClicked, setIsClicked] = useState<boolean>(false)

    return(
        <button {...props}
        onMouseDown={()=>{setIsClicked(true)}} 
        onMouseOut={()=>{setIsClicked(false)}} 
        style={isClicked ? {background:"var(--red-dark)"} : {}}
        className={classes.btn}>
            {props.children}
        </button>
    )
}

export default RedButton