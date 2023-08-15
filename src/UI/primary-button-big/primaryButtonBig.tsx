import React, { ButtonHTMLAttributes, FC, ReactNode, useState } from 'react';
import classes from './PrimaryButtonBig.module.css'

interface PrimaryButtonBigProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
  }

const PrimaryButtonBig: FC<PrimaryButtonBigProps> = (props)=>{

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

export default PrimaryButtonBig