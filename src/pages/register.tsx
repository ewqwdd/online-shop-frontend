import React, { useState } from 'react'
import register from "../api/registerApi"
import {userSlice} from '../store/userReducer'
import { useAppDispatch, useAppSelector } from '../store/storeHooks'
import Input from '../UI/input/Input'
import PrimaryButton from '../UI/primary-button/primaryButton'
import { modalSlice } from '../store/modalReducer'
import useMessage from '../hooks/useMessage'

interface ErrorMess{
    msg: string
}

interface Error{
    data: {
        errors:ErrorMess[];
        status: number; 
    }
    
}

interface ServerError{
    data: string;
}

interface Response{
    response:{
        data: string | object;
    }
}

const Register = ()=>{

    let [name, setName] = useState('')
    let [pass, setPass] = useState('')
    let [email, setEmail] = useState('')

    let actions = userSlice.actions

    let message = useMessage()

    let dispatch = useAppDispatch()

    let modalActions = modalSlice.actions


    const handleClick = async(e: React.FormEvent)=>{
        e.preventDefault()
        try{
            let res = await register(name, pass, email)
            console.log(res)
            let data = res.data
            dispatch(actions.login({token: data.token, username: data.username, role: data.role}))
            localStorage.setItem('token', data.token)
            dispatch(modalActions.hide())
            message("Succesfull registration!", true)
        }
        catch(err){
            let error = err as Response
            if(typeof error.response.data == 'string'){
                message(error.response.data as string, false)
            }
            else{
                let errors = error.response as Error
                if(errors.data.errors.length>0){
                    message(errors.data.errors[0].msg, false)
                }
            }
                                
            
        }
        
    }

    

    return(<form onSubmit={handleClick} className='login'>
        <h1>Register</h1>
        <Input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="username" />
        <Input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email"/>
        <Input type="password" value={pass} onChange={(e)=>{setPass(e.target.value)}} placeholder="password" />
        <PrimaryButton type="submit">register</PrimaryButton>
    </form>)
}

export default Register;