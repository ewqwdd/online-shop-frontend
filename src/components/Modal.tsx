import React, { FC, MouseEventHandler, ReactNode } from "react"
import { useAppDispatch, useAppSelector } from "../store/storeHooks"
import { modalSlice } from "../store/modalReducer"


const Modal: FC = ()=>{

    let show = useAppSelector(state=>state.modalReducer.show)
    let children = useAppSelector(state=>state.modalReducer.children)

    let dispatch = useAppDispatch()
    let actions = modalSlice.actions

    let closeModal = ()=>{
        dispatch(actions.hide())
    }

    let stopPropogination: MouseEventHandler = (e)=>{
        e.stopPropagation()
    }

    if(!show){
        return null
    }

    return(
        <div className="modal" onClick={closeModal}>
            <div onClick={stopPropogination} className="modal-frame">
                <div className="cross" onClick={closeModal}/>
                {children}
            </div>
        </div>
    )
}

export default Modal