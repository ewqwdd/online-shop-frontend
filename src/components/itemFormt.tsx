import React, { FC, Fragment } from 'react'
import BuyButtonBig from '../UI/buy-button-big/BuyButtonBig'
import {  IParamsItems } from '../types';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { basketApi } from '../api/basketApi';
import useMessage from '../hooks/useMessage';
import { userSlice } from '../store/userReducer';
import ItemFullPageDelete from './itemFullPageDelete';
import { itemEditSlice, itemEditStore } from '../store/itemEditReducer';
import EditButton from '../UI/edit-button/redButton';
import Input from '../UI/input/Input';
import PrimaryButton from '../UI/primary-button/primaryButton';
import { itemsApi } from '../api/itemsApi';

interface Params extends IParamsItems{
    files: File[];
    setSelectedFiles: (arg: File[])=>void;
}

const ItemForm: FC<Params> = ({data, files, setSelectedFiles})=>{

    let token = useAppSelector(state=>state.userReducer.token)
    let item = useAppSelector(state=>state.itemEditReducer) 
    let role = useAppSelector(state=>state.userReducer.role) 
    let edit = item.edit
    let price = item.price


    let [updateItem, resultUpdate] = itemsApi.useUpdateItemsMutation()

    let [updateBasket, result] = basketApi.useAddToBasketMutation()

    let message = useMessage()

    let dispatch = useAppDispatch()

    let actions = userSlice.actions
    let itemEditActions = itemEditSlice.actions

    let handleBuy = async()=>{
        if(data){
            let res = await updateBasket({token, item:data._id})
            if(result.error){ 
                dispatch(actions.logout())
                return message("Error, please login tou your account", false)
            }
            message("Succesfully added to basket", true)
        }
        
    }

    let handleSave = ()=>{
        let {price, description, characteristics, title, img} = item
        setSelectedFiles([])

        updateItem({_id: data._id, price, description, characteristics, title, token, files, img})
        dispatch(itemEditActions.hide())
    }

    let startEdit = ()=>{
        dispatch(itemEditActions.show())
        dispatch(itemEditActions.setItem(data))
    }

    return(
        <div className='item-right'>
        {edit ? <Input type="number" placeholder="price" value={price} onChange={(e)=>{dispatch(itemEditActions.setPrice({price: e.target.value}))}} />
        : <h2>£{data?.price}</h2>}
        {edit ? 
        <PrimaryButton onClick={handleSave}>
            Save
        </PrimaryButton>: 
        <BuyButtonBig onClick={handleBuy}>
            Buy
        </BuyButtonBig>
        }
        
        {role==='admin' ? 
        <Fragment>
            {edit ? 
            <EditButton onClick={()=>{dispatch(itemEditActions.hide())}}><img src="/cross-white.svg" /></EditButton>    : 
            <Fragment>
                <ItemFullPageDelete token={token} _id={data._id} />
                <EditButton onClick={startEdit}><img src="/pencil.svg" /></EditButton>
            </Fragment>
            }
        </Fragment>:
         null}
        
    </div>
    )
}

export default ItemForm;