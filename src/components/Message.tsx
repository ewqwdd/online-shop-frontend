import React, { FC } from "react"
import { useAppSelector } from "../store/storeHooks"

const Message: FC = ()=>{

    let isActive = useAppSelector(state=> state.messageReducer.show)
    let isPositive = useAppSelector(state=> state.messageReducer.positive)
    let children = useAppSelector(state=> state.messageReducer.children) as string


    return(
        <div className={`message ${isPositive ? "positive" : "negative"} ${isActive ? "message-active" : ""}`}>
            <span>{children}</span>
        </div>
    )
}

export default Message