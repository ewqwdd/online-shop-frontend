import React, { FC } from "react"
import RedButton from "../UI/red-button/redButton";

interface Characteristic{
    name: string;
    value: string;
    onClick: ()=>void;
}


const AdminCharacteristic: FC<Characteristic> = ({name, value, onClick})=>{


    return(
        <div className="admin-characteristic">
            <span>{name}</span>
            <span>{value}</span>
            <RedButton onClick={onClick}><img src="/Delete-button.svg" /></RedButton>
        </div>
    )
}

export default AdminCharacteristic;