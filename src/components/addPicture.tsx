import React, { FC, useState } from 'react'
import Input from '../UI/input/Input'
import GreyButton from '../UI/grey-button/GreyButton'
import AdminPicture from './adminPicture'
import AddPictureFile from './addPictureFile';

interface Props{
    pictures: string[];
    handleDelete: (url: string)=> void;
    handleAdd: (url: string)=> void
}

let AddPicture: FC<Props> = ({pictures, handleDelete, handleAdd})=>{

    let [picture, setPicture] = useState<string>('')

    let handleSubmit = (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        handleAdd(picture)
        setPicture('')
    }

    return(
        <div className='admin-picture'>
            <h3>Add pictures</h3>
            <div className='admin-add-picture'>
                <Input type="text" value={picture} onChange={(e)=>{setPicture(e.target.value)}} required={false} />
                <GreyButton type="button" onClick={handleSubmit}>add Picture</GreyButton>
                <h3>Pictures</h3>
                <div className='admin-images-overflow'>
                    {pictures?.map(elem=><AdminPicture key={elem} img={elem} onClick={()=>{
                        handleDelete(elem)
                    }}/>)}
                </div>
            </div>
        </div>
    )
}

export default AddPicture;