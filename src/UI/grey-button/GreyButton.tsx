import React, { ButtonHTMLAttributes, FC, ReactNode, useState } from 'react';
import classes from './GreyButton.module.css'

interface GreyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }

const GreyButton: FC<GreyButtonProps> = (props)=>{

    let [isClicked, setIsClicked] = useState<boolean>(false)

    return(
        <button {...props}
        onMouseDown={()=>{setIsClicked(true)}} 
        onMouseOut={()=>{setIsClicked(false)}} 
        style={isClicked ? {background: "rgb(150, 150, 150"} : {}}
        className={classes.btn}>
            {props.children}
        </button>
    )
}

export default GreyButton