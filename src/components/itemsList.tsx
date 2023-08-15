import React from "react"
import { IItems, IItemsWithAvg } from "../types"
import Item from "./Item";

interface itemsProps{
    items: IItemsWithAvg[];
    isRows: boolean;
}

const ItemsList: React.FC<itemsProps> = ({items, isRows})=>{

    return(<div className={`items-list ${isRows ? "items-list-1fr" : ""}`}>
        {items.map(item=><Item key={item._id} item={item} />)}
    </div>)
}

export default ItemsList;