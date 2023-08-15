import React, { FC } from 'react';
import RedButton from '../UI/red-button/redButton';
import { itemsApi } from '../api/itemsApi';
import { useNavigate } from 'react-router';
import useMessage from '../hooks/useMessage';
import DeleteIcon from '../UI/delete-icon';

interface Props{
    _id: string;
    token: string;
}

const ItemFullPageDelete: FC<Props> = ({_id, token})=>{

    let navigate = useNavigate()

    let message = useMessage()

    let [deleteItem, result] = itemsApi.useDeleteItemMutation()

    let handleClick = async()=>{
        try{
            await deleteItem({token, id:_id})
            navigate("/shop")
            message("Succesfully deleted", true)
        }
        catch(err){
            message("Something went wrong", false)
        }
    }

    return(
        <RedButton onClick={handleClick}><DeleteIcon /></RedButton>
    )
}

export default ItemFullPageDelete;