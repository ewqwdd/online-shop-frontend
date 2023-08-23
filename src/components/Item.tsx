import React, { useEffect, useState } from "react"
import { IItems, IItemsWithAvg } from "../types"
import { Link } from "react-router-dom";
import BuyButton from "../UI/buy-button/BuyButton";
import { useAppDispatch, useAppSelector } from "../store/storeHooks";
import { basketApi } from "../api/basketApi";
import useMessage from "../hooks/useMessage";
import { userSlice } from "../store/userReducer";
import Stars from "./stars";

interface itemProps{
    item: IItemsWithAvg;
}

const Item: React.FC<itemProps> = ({item})=>{

    let [isHover, setIsHover] = useState<boolean>(false)

    let sliced = item.characteristics.slice(0, 5)

    let token = useAppSelector(state=>state.userReducer.token)

    let [updateBasket, result] = basketApi.useAddToBasketMutation()

    let message = useMessage()

    let actions = userSlice.actions

    let dispatch = useAppDispatch()

    let handleClick = async()=>{
        await updateBasket({token, item:item._id})
        if(result.error){ 
            dispatch(actions.logout())
            return message("Error, please login tou your account", false)
        }
        message("Succesfully added to basket", true)
    }

    return(<div onMouseEnter={(e)=>{setIsHover(true)}} onMouseLeave={(e)=>{setIsHover(false)}} className="card" style={isHover ? {boxShadow: '0px 5px 6px rgb(181, 181, 181)', borderRadius: "0px"} : {}}>
        <Link to={`${item.url}`}><img src={item.img[0]} /></Link>
        <div className="card-desc">
            <Link to={`${item.url}`}><h3 className="link">{item.title}</h3></Link>
            <div className="price">
                £{item.price}
            </div>
            <BuyButton onClick={handleClick}>
                Buy
            </BuyButton>
        </div>
        <div className={isHover ? "card-extra-show" : "card-extra-hide"}>
                <div className="card-extra">
                    {item.avg ? <Stars value={item.avg} /> : null}
                    {sliced.map(elem=><div key={elem.name} className="card-list"><b>{elem.name}: </b>{elem.value}</div>)}
                </div>
            </div>
    </div>)
}

export default Item;