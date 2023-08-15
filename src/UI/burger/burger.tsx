import React, { FC } from 'react'
import classes from "./burger.module.css"

interface Params {
    onClick: ()=>void
}

const Burger: FC<Params> = ({onClick})=>{

    return <div onClick={onClick} className={`basket-link ${classes.burger}`}>
            <div className='full-height'>
                <img className={classes.img} src="/hamburger.svg" />
            </div>
        </div>
}

export default Burger