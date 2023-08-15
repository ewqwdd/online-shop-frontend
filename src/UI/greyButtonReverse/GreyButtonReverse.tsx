import React, { ButtonHTMLAttributes, FC, ReactNode, useState } from 'react';
import classes from './GreyButtonReverse.module.css'

interface GreyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
  }

const GreyButtonReverse: FC<GreyButtonProps> = (props)=>{

    let [isClicked, setIsClicked] = useState<boolean>(false)

    return(
        <button {...props}
        onMouseDown={()=>{setIsClicked(true)}} 
        onMouseOut={()=>{setIsClicked(false)}} 
        style={isClicked ? {color: "rgb(150, 150, 150)", border: "2px solid rgb(150, 150, 150)"} : {}}
        className={classes.btn}>
            {props.children}
        </button>
    )
}

export default GreyButtonReverse