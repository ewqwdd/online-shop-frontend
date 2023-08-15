import React, { FC } from "react"
import RedButton from "../UI/red-button/redButton"
import DeleteIcon from "../UI/delete-icon"

const AdminPicture: FC<{img: string, onClick: ()=>void}> = ({img, onClick})=>{


    return (
        <div className="adminImg">
            <img src={img} />
            <RedButton onClick={onClick}><DeleteIcon /></RedButton>
        </div>
    )
}

export default AdminPicture