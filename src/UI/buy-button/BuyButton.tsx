import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import classes from "./BuyButton.module.css"

interface MyComponentProps {
    children: ReactNode;
    onClick: any;
  }

const BuyButton: FC<MyComponentProps> = ({children, ...props})=>{

    return (
    <button {...props} className={classes.buy}>
        <span>{children}</span>
    </button>
    )
}

export default BuyButton