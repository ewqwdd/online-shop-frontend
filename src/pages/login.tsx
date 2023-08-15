import React, { useState } from 'react'
import login from "../api/loginApi"
import {userSlice} from '../store/userReducer'
import { useAppDispatch, useAppSelector } from '../store/storeHooks'
import PrimaryButton from '../UI/primary-button/primaryButton'
import Input from '../UI/input/Input'
import { modalSlice } from '../store/modalReducer'
import { messageSlice } from '../store/messageReducer'
import useMessage from '../hooks/useMessage'

const Login = ()=>{

    let [name, setName] = useState('')
    let [pass, setPass] = useState('')

    let actions = userSlice.actions

    let message = useMessage()

    let dispatch = useAppDispatch()

    let modalActions = modalSlice.actions

    const handleClick = async(e: React.FormEvent)=>{
        e.preventDefault()
        try{
            let res = await login(name, pass)
            console.log(res)
            let data = res.data
            dispatch(actions.login({token: data.token, username: data.username, role: data.role}))
            localStorage.setItem('token', data.token)   
            dispatch(modalActions.hide())
            message("Successfull login!", true)        
        }
        catch(err){
            message("Incorrect login details", false)
        }
        
    }

    

    return(<form onSubmit={handleClick} className='login'>
    <h1>Login</h1>
    <Input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="username" />
    <Input type="password" value={pass} onChange={(e)=>{setPass(e.target.value)}} placeholder="password" />
    <PrimaryButton type="submit">login</PrimaryButton>
</form>)
}

export default Login;