import React, { FC, SelectHTMLAttributes } from 'react'
import classes from "./Select.module.css"

interface SelectProp extends SelectHTMLAttributes<HTMLSelectElement>{
    vals:{title: string, value: string}[];
    title: string;
}

let Select: FC<SelectProp> = (props)=>{

    return(
        <select className={classes.select} {...props}>
            <option disabled>{props.title}</option>
            {props.vals.map(elem=><option value={elem.value}>{elem.title}</option>)}
        </select>
    )
}

export default Select;