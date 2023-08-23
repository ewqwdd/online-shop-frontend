import React, { FC, Fragment, useState } from "react";
import { IUser } from "../types";
import Input from "../UI/input/Input";
import Select from "../UI/select/Select";
import PrimaryButton from "../UI/primary-button/primaryButton";
import EditButton from "../UI/edit-button/redButton";
import { usersApi } from "../api/usersApi";
import { useAppSelector } from "../store/storeHooks";
import useMessage from "../hooks/useMessage";

let AdminUserEdit: FC<{user: IUser, close: ()=>void}> = ({user, close})=>{

    let [username, setUsername] = useState<string>(user.username)
    let [email, setEmail] = useState<string>(user.email)
    let [role, setRole] = useState<string>(user.role)
    let token = useAppSelector(state=>state.userReducer.token)
    let message = useMessage()

    let [updateUsers, result] = usersApi.usePutUserMutation()
    
    let handleConfirm = async()=>{
        try{
            await updateUsers({username, role, email, token, id: user._id})
            message("Succesfulle updated", true)
            close()
        }
        catch(err){
            message("Something went worng", false)
        }
    }

    return(
        <Fragment>
            <div className="admin-user-elem">{user._id}</div>
            <Input value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <Input value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <Select title="role" value={role} onChange={(e)=>{setRole(e.target.value)}} vals={[{title: "admin", value:"admin"}, {title: "user", value:"user"}]} />
            <div className="admin-user-elem buttons">
                <PrimaryButton onClick={handleConfirm}><img src="/save-44.svg" /></PrimaryButton>
                <EditButton onClick={close}><img src="/cross-white.svg" /></EditButton>   
            </div>
        </Fragment>
    )
}

export default AdminUserEdit;