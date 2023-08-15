import React, { MouseEventHandler, useEffect, useState } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import check from './api/checkApi';
import { useAppDispatch, useAppSelector } from './store/storeHooks';
import { userSlice } from './store/userReducer';
import useMessage from './hooks/useMessage';
import { logoutSlice } from './store/logoutReducer';


function App() {

  let actions = userSlice.actions
  let dispatch = useAppDispatch()
  let actionsLogout = logoutSlice.actions

   let closeLogout: MouseEventHandler = (e)=>{
    dispatch(actionsLogout.hide())
   }
  const [isInitialized, setIsInitialized] = useState(false);

  let message = useMessage()

  let start = async()=>{
    if(!isInitialized && localStorage.getItem('token')){
      try{
        let res = await check(localStorage.getItem('token') as string)
        if(!res){
          return
        }
        dispatch(actions.login({token: localStorage.getItem('token'), username: res.username, role: res.role}))
        setIsInitialized(true)
      }
      catch(err){
        message("Your session has expired", false)
      }

    }
  }
  
  useEffect(()=>{
    start()
  }, [isInitialized, dispatch])


  return (
    <div onClick={closeLogout}>
      <AppRouter />
    </div>
  );
}

export default App;
