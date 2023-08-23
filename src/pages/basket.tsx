import React from 'react'
import { basketApi } from '../api/basketApi';
import Loader from '../UI/Loader/Loader';
import BasketItem from '../components/basketItem';
import { IBasketItems } from '../types';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { Navigate, useNavigate } from 'react-router';
import { modalSlice } from '../store/modalReducer';
import Login from './login';
import useMessage from '../hooks/useMessage';
import BasketTotal from '../components/basketTotal';
import { userSlice } from '../store/userReducer';

const Basket = ()=>{

    let isLogged = useAppSelector(state=>state.userReducer.isLoged)
    let username = useAppSelector(state=>state.userReducer.user)
    let token = useAppSelector(state=>state.userReducer.token)
    let navigate = useNavigate()
    let dispatch = useAppDispatch()
    let modalActions = modalSlice.actions
    let userActions = userSlice.actions

    let message = useMessage()

    

    if(isLogged===false){
        navigate("/")
    }

    let {data, isLoading, isError} = basketApi.useFetchBasketQuery({username, token})

    
      if (isError) {
        dispatch(userActions.logout())
        navigate("/")
        dispatch(modalActions.show({children: <Login />}))
        message("Error, please login to your account", false)
      }
    
      return (
        <div className="basket">
          {isLoading ? <Loader /> : null}
          <div className='basket-items'>
          {data ? 
          data.items.map((elem: IBasketItems) => (
            <BasketItem key={elem.item} item={elem} />
          )) : 
          null}
                      
          </div>
          <BasketTotal />
        </div>
      );
};

export default Basket;