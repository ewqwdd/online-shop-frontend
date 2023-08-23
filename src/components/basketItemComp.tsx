import React, { FC, useEffect } from 'react'
import { IItems } from '../types'
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { basketApi } from '../api/basketApi';
import { Link } from 'react-router-dom';
import { basketPriceSlice } from '../store/basketPricesReducer';

interface Params{
    number: number;
    data: IItems
}

const BasketItemComp: FC<Params> = ({data, number})=>{

    let token = useAppSelector(state=>state.userReducer.token)

    let dispatch = useAppDispatch()

    let actions = basketPriceSlice.actions

    let [updateIncrease, resultIncrease] = basketApi.useAddToBasketMutation()

    let [updateDecrease, resultDecrease] = basketApi.useDecreaseMutation()

    useEffect(()=>{
        dispatch(actions.update({id: data._id, price: number*data.price}))

        return ()=>{
            dispatch(actions.update({id: data._id, price: 0}))
        }
    },[number])

    const handlePlus = ()=>{
        updateIncrease({token, item:data._id})
    }
    const handleMinus = ()=>{
        updateDecrease({token, item:data._id})
    }

    

    return(
        <div className='basket-item'>
            <Link to={`/shop/${data.url}`}>
            <img src={data.img[0]} />
            </Link>
            <span>{data.title}</span>
            <div className='basket-buttons'>
            <button className='basket-amount-btn' onClick={handlePlus}>+</button>
            <span>{number}</span>
            <button onClick={handleMinus} className='basket-amount-btn'>-</button>
            </div>
            <span className='price-basket'>
                £{data.price*number}
            </span>
        </div>
    )
}

export default BasketItemComp;