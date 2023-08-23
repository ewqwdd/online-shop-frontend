import React, { useState } from 'react'
import Input from '../UI/input/Input'
import { ICharacteristics } from '../types'
import PrimaryButton from '../UI/primary-button/primaryButton'
import RedButton from '../UI/red-button/redButton'
import { itemsApi } from '../api/itemsApi'
import { useAppSelector } from '../store/storeHooks'
import useMessage from '../hooks/useMessage'
import AddCharacteristic from './addCharacterestic'
import AddPicture from './addPicture'
import AddPictureFile from './addPictureFile'

const AdminAddItem = ()=>{
    
    let [title, setTitle] = useState<string>('')
    let [price, setPrice] = useState<string>('')
    let [description, setDescription] = useState<string>('')
    let [characteristics, setCharacteristics] = useState<ICharacteristics[]>([])
    let [pictures, setPictures] = useState<string[]>([])
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    let message = useMessage()

    let token = useAppSelector(state=>state.userReducer.token)

    let [addItem, result] = itemsApi.useAddItemMutation()

    let handlePrice = (e: React.ChangeEvent<HTMLInputElement>)=>{
            setPrice(e.target.value)
    }

    let handleAddPictures = (url: string)=>{
        setPictures([...pictures, url])
    }

    let handleDeletePictures = (url: string)=>{
        let indexToDelete = pictures.findIndex(elem=>elem===url)
        let temp = [...pictures]
        temp.splice(indexToDelete, 1)
        setPictures(temp)
    }

    let handleAddChar = (name:string, value: string)=>{
        setCharacteristics([...characteristics, {name, value}])
    }

    let handleDeleteChar = (name:string, value: string)=>{
        setCharacteristics(characteristics.filter(elem=>elem.name!==name || elem.value!==value))
    }

    
    
    let handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault()
        let replacedDescription = description.replace(/\n/g, "/")
        try{
            await addItem({title, price: Number(price), description: replacedDescription, characteristics, img:pictures, token, files: selectedFiles})
            return message("Succesfully added", true)
        }
        catch(err){
            return message("Something went wrong", false)
        }
    }

    return(
        <form className='admin-form' onSubmit={handleSubmit}>
            <h1 >Add New Item</h1>
            <div className='add-item-form'>
                <div>
                    <h3>Title</h3>
                    <div className='admin-form-text'>
                        <Input placeholder='title' value={title} onChange={(e)=>{setTitle(e.target.value)}} required/>
                        <Input type="number" placeholder='price' value={price} onChange={handlePrice} required/>
                        <textarea className='resize-vertical' placeholder='description' value={description} onChange={(e)=>{setDescription(e.target.value)}} required/>
                    </div>
                </div>
                <AddCharacteristic characteristics={characteristics} handleAdd={handleAddChar} handleDelete={handleDeleteChar}/>
                <div>
                    <AddPicture pictures={pictures} handleAdd={handleAddPictures} handleDelete={handleDeletePictures} />
                    <AddPictureFile selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}/>
                </div>
                
            </div>
            
            <div className='buttons'>
                <PrimaryButton type="submit">Submit</PrimaryButton>
                <RedButton type="reset">Reset</RedButton>
            </div>
        </form>
    )
}

export default AdminAddItem