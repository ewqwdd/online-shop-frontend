import React, { ButtonHTMLAttributes, FC, useState } from 'react';
import classes from './EditButton.module.css'

interface EditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
  }

const EditButton: FC<EditButtonProps> = (props)=>{

    let [isClicked, setIsClicked] = useState<boolean>(false)

    return(
        <button {...props}
        onMouseDown={()=>{setIsClicked(true)}} 
        onMouseOut={()=>{setIsClicked(false)}} 
        style={isClicked ? {background:"var(--grey-hover)"} : {}}
        className={classes.btn}>
            {props.children}
        </button>
    )
}

export default EditButton