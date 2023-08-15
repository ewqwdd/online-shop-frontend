import React, { FC, MouseEventHandler, ReactNode, useState } from 'react'
import Input from '../UI/input/Input'
import EditButton from '../UI/edit-button/redButton'

let ItemFilters: FC<{setFiltersShow: (arg: boolean)=>void, filtersShow: boolean, children: ReactNode}> = ({setFiltersShow, filtersShow, children})=>{
    

    let closeSide = ()=>{
        setFiltersShow(false)
    }

    let stopPropogination: MouseEventHandler = (e)=>{
        e.stopPropagation()
    }

    return(
        <div onClick={closeSide} className={`items-filter ${filtersShow ? "" : "hide"}`}>
                        <div onClick={stopPropogination} className='items-side'>
                            <div className="cross" onClick={()=>{setFiltersShow(false)}}/>
                                {children}
                        </div>
                    </div>
    )
}

export default ItemFilters