import React, { FormEventHandler, useState } from 'react'
import Select from '../UI/select/Select'
import Input from '../UI/input/Input'
import PrimaryButton from '../UI/primary-button/primaryButton'
import { usersApi } from '../api/usersApi'
import useMessage from '../hooks/useMessage'
import { useAppDispatch, useAppSelector } from '../store/storeHooks'
import { modalSlice } from '../store/modalReducer'

let AdminAddUserForm = ()=>{

    let [username, setUsername] = useState<string>("")
    let [password, setPassword] = useState<string>("")
    let [confirmPassword, setConfirmPassword] = useState<string>("")
    let [email, setEmail] = useState<string>("")
    let [role, setRole] = useState<string>("user")

    let token = useAppSelector(state=> state.userReducer.token)

    let [postUsers, result] = usersApi.usePostUsersMutation()
    let message = useMessage()

    let dispatch = useAppDispatch()
    let modalActions = modalSlice.actions

    let handleSubmit: FormEventHandler<HTMLFormElement> = async(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            return message("Passwords don't match", false)
        }
        try {
            await postUsers({ username, password, email, role, token });
            if(result.status === "rejected"){
                return message("Something went wrong", false);
            }
            message("Successfully added", true);
            dispatch(modalActions.hide())
        } catch (err) {
            return message("Something went wrong", false);
        }
        
        
    }

    return(
        <form className='adduser-form' onSubmit={handleSubmit}>
            <Input required placeholder="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
            <Input required type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            <Input required type="password" placeholder="confirm password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} />
            <Input required type="email" placeholder="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <Select title="role" value={role} onChange={(e)=>{setRole(e.target.value)}} vals={[{title: "admin", value:"admin"}, {title: "user", value:"user"}]} />
            <PrimaryButton type='submit'>submit</PrimaryButton>
        </form>
    )
}

export default AdminAddUserForm;