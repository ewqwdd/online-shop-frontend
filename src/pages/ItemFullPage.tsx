import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { itemsApi } from '../api/itemsApi';
import ErrorPage from './404';
import Loader from '../UI/Loader/Loader';
import ItemLeft from '../components/itemLeft';
import Characteristics from '../components/characteristics';
import Description from '../components/description';
import ItemForm from '../components/itemFormt';
import useMessage from '../hooks/useMessage';
import { itemEditSlice } from '../store/itemEditReducer';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import Reviews from '../components/reviews';
import AddReview from '../components/addReview';


const ItemFullPage = ()=>{

    let [selectedFiles, setSelectedFiles] = useState<File[]>([])

    let {name} = useParams()
    let message = useMessage()

    let isLogged = useAppSelector(state=>state.userReducer.isLoged)

    let itemEditActions = itemEditSlice.actions
    let dispatch = useAppDispatch()
    useEffect(()=>{
        return ()=>{
            dispatch(itemEditActions.setEmpty())
            dispatch(itemEditActions.hide())
        }
       }, [])

    if(!name){
        return <ErrorPage />
    }

    let {data, isLoading, isError} = itemsApi.useFetchItemQuery(name);

    if (isError) {
        message("Error occurred while fetching data.", false)
      }

    return(
        <Fragment>
            {isLoading ? <Loader /> : data ? 
            <div className='item'>
                <ItemLeft selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} data={data} />
                <ItemForm files={selectedFiles} data={data} setSelectedFiles={setSelectedFiles} />
                <Characteristics data={data} />
                <Description data={data} />
                {isLogged ? <AddReview item={data}/> : null}
                <Reviews items={data} />
            </div> :
            null}
            
        </Fragment>
    )
}

export default ItemFullPage;