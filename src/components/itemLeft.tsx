import React, { FC, Fragment, useEffect, useState } from 'react'
import { IParamsItems } from '../types'
import "../App.css"
import { useAppDispatch, useAppSelector } from '../store/storeHooks'
import Input from '../UI/input/Input'
import { itemEditSlice } from '../store/itemEditReducer'
import AddPicture from './addPicture'
import AddPictureFile from './addPictureFile'

interface Params extends IParamsItems{
    selectedFiles: File[];
    setSelectedFiles: (arg: File[])=>void;
}

const ItemLeft: FC<Params> = ({data, setSelectedFiles, selectedFiles})=>{


    let [pic, setPic] = useState<number>(0)
    let [slideRight, setSlideRight] = useState<boolean>(false)
    let [slideLeft, setSlideLeft] = useState<boolean>(false)

    let edit = useAppSelector(state=>state.itemEditReducer.edit)
    let title = useAppSelector(state=>state.itemEditReducer.title) as string
    let pictures = useAppSelector(state=>state.itemEditReducer.img) as string[]
    let dispatch = useAppDispatch()

    let itemEditActions = itemEditSlice.actions

    useEffect(()=>{
        setPic(0)
    }, [edit])

    let handlePlus = ()=>{
        if(data.img.length<2){
            return
        }
        setSlideRight(true)
        setTimeout(()=>{
            if(data.img.length>pic+1){
                setPic(pic+1)
            }
            else{
                setPic(0)
            }
            setSlideRight(false)
            }, 320)
            
        }
        
    

    let handleMinus = ()=>{
        if(data.img.length<2){
            return
        }
        setSlideLeft(true)
        setTimeout(()=>{
            if(pic-1>=0){
                setPic(pic-1)
            }
            else{
                setPic(data.img.length-1)
            }
            setSlideLeft(false)
        }, 320)
       
    }

    let handleAddPicture = (url: string)=>{
        dispatch(itemEditActions.setImg({img: [url, ...pictures]}))
    }

    let handleDeletePicture = (url: string)=>{
        let indexToDelete = pictures.findIndex(elem=>elem===url)
        let temp = [...pictures]
        temp.splice(indexToDelete, 1)
        dispatch(itemEditActions.setImg({img: temp}))
    }


    return(
    <div className='item-left'>
        <h1>
            {edit ? 
            <Fragment>
                <h2>Set title</h2>
                <Input value={title} onChange={(e)=>{dispatch(itemEditActions.setTitle({title: e.target.value}))}}/>
            </Fragment>: 
            <Fragment>{data.title}</Fragment>}
        </h1>
        {edit ? 
            <Fragment>
                <h2>Add picture</h2>
                <AddPicture pictures={pictures} handleAdd={handleAddPicture} handleDelete={handleDeletePicture} />
                <AddPictureFile selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
            </Fragment>:
            <div className='item-page-img-container'>
            <div className={`img ${slideRight ? "slide-right" : slideLeft ? "slide-left" : ''}`}>
            <img src={data.img[pic]} style={{maxHeight: "600px"}} />
            </div>
            <div className='arrow-right arrow-left'onClick={handleMinus}><img src="/slider_arrow.svg" /></div>
            <div className='arrow-right' onClick={handlePlus}><img src="/slider_arrow.svg" /></div>
        </div>
        }
        
        
    </div>
)
}

export default ItemLeft