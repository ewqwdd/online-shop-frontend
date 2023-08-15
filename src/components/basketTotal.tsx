import React, { FC,} from "react"
import { useAppSelector } from "../store/storeHooks";
import { BasketPrice } from "../store/basketPricesReducer";
import PrimaryButtonBig from "../UI/primary-button-big/primaryButtonBig";
import { basketApi } from "../api/basketApi";


const BasketTotal: FC = ()=>{
    let sum = 0;
    let token = useAppSelector(state=>state.userReducer.token) as string
    let items = useAppSelector((state)=>state.basketPriceReducer) as BasketPrice
    for(let i in items){
        sum+=items[i]
    }

    let [buy, result] = basketApi.useBuyMutation()
    
    return (
        <div className="basket-total">
            <h1>£{sum}</h1>
            <PrimaryButtonBig onClick={()=>{buy({token})}}>Buy</PrimaryButtonBig>
        </div>
    )
}

export default BasketTotal