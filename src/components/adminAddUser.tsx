import React from "react"
import PrimaryButton from "../UI/primary-button/primaryButton"
import { useAppDispatch } from "../store/storeHooks"
import { modalSlice } from "../store/modalReducer"
import AdminAddUserForm from "./adminAddUserForm"

let AddUser = ()=>{

    let modalActions = modalSlice.actions

    let dispatch = useAppDispatch()

    let handleClick = ()=>{
        dispatch(modalActions.show({children: <AdminAddUserForm />}))
    }

    return(
        <PrimaryButton onClick={handleClick}>Add user</PrimaryButton>
    )
}

export default AddUser;