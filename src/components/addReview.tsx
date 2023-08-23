import React, { FC, Fragment, useEffect, useState } from "react"
import PrimaryButton from "../UI/primary-button/primaryButton"
import Input from "../UI/input/Input"
import { useAppSelector } from "../store/storeHooks"
import { usersApi } from "../api/usersApi"
import { IItems } from "../types"
import Loader from "../UI/Loader/Loader"
import { itemsApi } from "../api/itemsApi"
import useMessage from "../hooks/useMessage"

const AddReview: FC<{item: IItems}> = ({item})=>{

    let [rate, setRate] = useState<number>(0)
    let [hover, setHover] = useState<number>(0)
    let [text, setText] = useState<string>("")
    let message = useMessage()

    const marks = [2, 4, 6, 8, 10]

    let token = useAppSelector(state=>state.userReducer.token)

    let {data, isLoading, isError} = usersApi.useIfBoughtItemQuery({token, id: item._id}) 
    let [addReview, result] = itemsApi.useAddReviewMutation()

    useEffect(()=>{
        if(result.error){
            //@ts-ignore
            if(result.error.data){
                //@ts-ignore
                message(result.error.data.error, false)
            }}
    }, [result])


    if(isError){
        return null
    }

    let handleSubmit = ()=>{
        if(text.length>0){
            addReview({value: rate, id: item._id, text, token})
        }  
    }

    
    return(
        <Fragment>
            {isLoading ? <Loader /> : 
            data==true ?  <div className="add-review review">
            <div className="stars" onMouseOut={()=>{setHover(0)}}>
                {marks.map(elem=><img key={`add-review star ${elem}`} src={rate>=elem ? "/star-yellow.svg" : hover>=elem ? "/star-hover.svg" : "/star.svg"} className="star" onClick={
                    ()=>{
                        if(rate==elem){
                            return setRate(0)
                        }
                        setRate(elem)
                    }
                   
                    } 
                    onMouseOver={()=>{
                        setHover(elem)
                    }}
                    />)}
            </div>
            <textarea value={text} onChange={(e)=>{setText(e.target.value)}}/>
            <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
        </div> :
        null
        }
           
        </Fragment>
    )
}

export default AddReview