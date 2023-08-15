import React, { FC, Fragment } from 'react'
import { IBasketItems } from '../types'
import { itemsApi } from '../api/itemsApi';
import Loader from '../UI/Loader/Loader';
import BasketItemComp from './basketItemComp';

interface basketItem{
    item: IBasketItems;
}


const BasketItem: FC<basketItem> = ({item})=>{

    let {data, isLoading, isError} = itemsApi.useFetchIdQuery(item.item)

    return(
        <Fragment>
            {isLoading ? <Loader /> : data ? <BasketItemComp data={data} number={item.amount} />: null}
        </Fragment>
    )
}

export default BasketItem;