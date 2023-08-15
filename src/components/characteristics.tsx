import React, { FC, FormEventHandler, Fragment, useState } from 'react'
import { ICharacteristics, IParamsItems } from '../types'
import Chara from './chara'
import { useAppDispatch, useAppSelector } from '../store/storeHooks'
import { itemEditSlice } from '../store/itemEditReducer'
import AddCharacteristic from './addCharacterestic'



const Characteristics: FC<IParamsItems> = ({data})=>{

    let edit = useAppSelector(state=>state.itemEditReducer.edit)
    let chars = useAppSelector(state=>state.itemEditReducer.characteristics) as ICharacteristics[]
    let itemEditActions = itemEditSlice.actions
    let dispatch = useAppDispatch()
    let [title, setTitle] = useState<string>("")
    let [value, setValue] = useState<string>("")

    let handleSubmit: FormEventHandler<HTMLFormElement> = (e)=>{
        e.preventDefault()
        dispatch(itemEditActions.setChars({characteristics: [{name: title, value}, ...chars]}))
    }

    let handleAdd = (name: string, value: string)=>{
        dispatch(itemEditActions.setChars({characteristics: [{name, value}, ...chars]}))
    }

    let handleDelete = (name: string, value: string)=>{
        dispatch(itemEditActions.setChars({characteristics: chars.filter(chr=>chr.name!==name)}))
    }

    return(
        <Fragment>
            
            <div className='characteristics'>
                <h2>Characteristics</h2>
                {edit ? 
                <Fragment>
                    <AddCharacteristic characteristics={chars} handleAdd={handleAdd} handleDelete={handleDelete} />
                </Fragment>
                :
                data.characteristics.map(elem=><Chara key={elem.name} elem={elem} />)}
            </div>
        </Fragment>
    )
}

export default Characteristics;