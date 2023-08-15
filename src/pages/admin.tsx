import React, { Fragment, useEffect } from 'react'

import useMessage from '../hooks/useMessage'
import { useAppSelector } from '../store/storeHooks'
import check from '../api/checkAdmin'
import { useNavigate } from 'react-router'
import AdminAddItem from '../components/adminAddItem'
import AdminUsers from '../components/adminUsers'
import AdminAddUser from '../components/adminAddUser'


const Admin = ()=>{

    let token = useAppSelector(state=>state.userReducer.token) as string
    let role = useAppSelector(state=>state.userReducer.role) as string

    let message = useMessage()
    let navigate = useNavigate()

    const checkIfAdmin = async(token: string)=>{
        
        if(!token){
            return navigate("/")
        }

        try{
            let res = await check(token)
        }
        catch(err){
            navigate("/")
            return message("You don't have access to this page", false)
        }
    }

    useEffect(()=>{
        checkIfAdmin(token)
    }, [token])

    return(
        <Fragment>
            {role==="admin" ? 
                <Fragment>
                    <AdminAddItem />
                    <AdminUsers />
                    <AdminAddUser />
                </Fragment>
             : null}
        </Fragment>
    )
  
}

export default Admin