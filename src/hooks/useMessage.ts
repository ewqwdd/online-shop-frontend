import React from "react"
import { ReactNode } from "react";
import { messageSlice } from "../store/messageReducer";
import { useAppDispatch } from "../store/storeHooks";


const useMessage = () =>{

    let messageActions = messageSlice.actions
    let dispatch = useAppDispatch()
    return (children: string, isPositive: boolean): void=>{
        dispatch(messageActions.show({positive: isPositive, children}))

        setTimeout(()=>{
            dispatch(messageActions.hide())
        }, 4000)
    }
    
}

export default useMessage