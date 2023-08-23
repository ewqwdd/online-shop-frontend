import React, { FC, Fragment, useState } from "react"
import { IUser } from "../types"
import RedButton from "../UI/red-button/redButton";
import DeleteIcon from "../UI/delete-icon";
import { usersApi } from "../api/usersApi";
import { useAppSelector } from "../store/storeHooks";
import useMessage from "../hooks/useMessage";
import PenIcon from "../UI/penIcon";
import EditButton from "../UI/edit-button/redButton";
import AdminUserEdit from "./adminUserEdit";

let AdminUser: FC<{user: IUser}> = ({user})=>{

    let token = useAppSelector(state=>state.userReducer.token)

    let [edit, setEdit] = useState<boolean>(false)

    let [deleteUser, result] = usersApi.useDeleteUsersMutation()

    let message = useMessage()

    let handleDelete = async ()=>{
        try{
            await deleteUser({token, id: user._id})
            message("Succesfully deleted", true)
        }
        catch(err){
            message("Something went srong", false)
        }
        
    }

    let handleEdit = ()=>{
        
    }

    return(
        <Fragment>
            {!edit ? 
            <Fragment>
                <div className="admin-user-elem">{user._id}</div>
                <div className="admin-user-elem">{user.username}</div>
                <div className="admin-user-elem">{user.email}</div>
                <div className="admin-user-elem">{user.role}</div>
                <div className="admin-user-elem buttons">
                    <RedButton onClick={handleDelete}>
                        <DeleteIcon />
                    </RedButton>
                    <EditButton onClick={()=>{setEdit(true)}}>
                        <PenIcon />
                    </EditButton>
                </div>
            </Fragment>:
            <Fragment>
                <AdminUserEdit user={user} close={()=>{setEdit(false)}} />
            </Fragment>
            }
    </Fragment>        
            

    )
}

export default AdminUser;