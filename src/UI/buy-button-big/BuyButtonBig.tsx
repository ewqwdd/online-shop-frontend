import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import classes from "./BuyButtonBig.module.css"

interface MyComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
  }

const BuyButtonBig: FC<MyComponentProps & any> = ({children, ...props})=>{

    return (
    <button {...props} className={classes.buy}>
        <span>{children}</span>
    </button>
    )
}

export default BuyButtonBig