import React from 'react'
import { usersApi } from '../api/usersApi'
import { useAppSelector } from '../store/storeHooks'
import AdminUser from './adminUser'

const AdminUsers = ()=>{

    let token = useAppSelector(state=>state.userReducer.token) 
    
    let {data, isError, isLoading} = usersApi.useGetUsersQuery({token})

    

    return(<div className='admin-users'>
        <div className='admin-user first-row'>
            <div className="admin-user-elem">id</div>
            <div className="admin-user-elem">username</div>
            <div className="admin-user-elem">email</div>
            <div className="admin-user-elem">role</div>
            <div className="admin-user-elem"></div>
        </div>
        <div className='admin-user'>
            {data?.map(elem=><AdminUser key={elem._id} user={elem} />)}
        </div>
        
    </div>)
}

export default AdminUsers;