import React, { ButtonHTMLAttributes, FC, ReactNode, useState } from 'react';
import classes from './PrimaryButton.module.css'

interface GreyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
  }

const PrimaryButton: FC<GreyButtonProps> = (props)=>{

    let [isClicked, setIsClicked] = useState<boolean>(false)

    return(
        <button {...props}
        onMouseDown={()=>{setIsClicked(true)}} 
        onMouseOut={()=>{setIsClicked(false)}} 
        style={isClicked ? {background:"var(--primary-dark)"} : {}}
        className={classes.btn}>
            {props.children}
        </button>
    )
}

export default PrimaryButton