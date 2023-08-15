import React, { FC, FormEventHandler, useState } from 'react'
import Input from '../UI/input/Input'
import GreyButton from '../UI/grey-button/GreyButton'
import AdminCharacteristic from './adminCharacteristic'
import { ICharacteristics } from '../types'

interface Props{
    characteristics: ICharacteristics[];
    handleAdd: (name: string, value: string)=>void;
    handleDelete: (name: string, value: string)=>void
}

let AddCharacteristic: FC<Props> = ({characteristics, handleAdd, handleDelete})=>{

    let [charaName, setCharaName] = useState<string>("")
    let [charaValue, setCharaValue] = useState<string>("")

    let handleSubmit = (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        handleAdd(charaName, charaValue)
        setCharaName("")
        setCharaValue("")
    }

    return(
        <div className='admin-characteristics-form'>
        <h3>Add characteristics</h3>
        <div className='admin-add-characteristics'>
            <Input type="text" placeholder='name' value={charaName} onChange={(e)=>{setCharaName(e.target.value)}} required={false} />
            <Input type="text" placeholder='value' value={charaValue} onChange={(e)=>{setCharaValue(e.target.value)}} required={false} />
            <GreyButton onClick={handleSubmit}>Add</GreyButton>
        </div>
        <h3>Characteristics</h3>
        <div className='admin-add-characteristics'>
            {characteristics?.map(elem=><AdminCharacteristic key={elem.name} name={elem.name} value={elem.value} onClick={()=>{
                handleDelete(elem.name, elem.value)
            }} />)}
        </div>
    </div>
    )
   
}

export default AddCharacteristic