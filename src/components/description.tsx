import React, { FC } from 'react'
import { IParamsItems } from '../types'
import { useAppDispatch, useAppSelector } from '../store/storeHooks'
import { itemEditSlice } from '../store/itemEditReducer'

const Description: FC<IParamsItems> = ({data})=>{

    let edit = useAppSelector(state=>state.itemEditReducer.edit)
    let description = useAppSelector(state=>state.itemEditReducer.description) as string
    let dispatch = useAppDispatch()

    let itemEditActions = itemEditSlice.actions

    let desc = data.description.split('/')

    return(
        <div className='characteristics'>
            <h2>About {data.title}</h2>
            {edit ? 
            <div className='flex-column'>
                <textarea className='resize-vertical' placeholder='description' value={description} onChange={(e)=>{dispatch(itemEditActions.setDesc({description: e.target.value}))}} />
            </div> : 
            desc.map((elem, index)=><p key={index}>{elem}</p>)}
        </div>
    )
}

export default Description;