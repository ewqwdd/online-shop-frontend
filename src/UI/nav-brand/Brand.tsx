import React, { FC } from 'react';
import classes from './Brand.module.css'

const Brand: FC<React.PropsWithChildren<{}>> = (props)=>{
    return(
        <div className={classes.brand}>{props.children}</div>
    )
}

export default Brand