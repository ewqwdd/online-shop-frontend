import React, { FC, useEffect, useState } from "react"
import { IItems, IReview, IUser } from "../types"
import Review from "./review"
import { usersApi } from "../api/usersApi"
import { useAppSelector } from "../store/storeHooks"
import { Fragment } from "react"
import Loader from "../UI/Loader/Loader"
import ErrorPage from "../pages/404"

const Reviews: FC<{items: IItems}> = ({items})=>{

    let token = useAppSelector(state=>state.userReducer.token)


    let {data, isLoading, isError} = usersApi.useGetUsersQuery({token})

    let username = useAppSelector(state=>state.userReducer.user)

    let [reviews, setReviews] = useState<IReview[]>([])

    useEffect(()=>{
        if(data && items){
            let index = data.findIndex((elem)=>elem.username==username)
            if(index===-1){
                setReviews(items.rating)
                return
            }
            let id = data[index]._id
            index = items.rating.findIndex((elem)=>elem.user_id==id)
            if(index===-1){
                setReviews(items.rating)
                return
            }
            let arr = [...items.rating]
            let temp = items.rating[0]
            arr[0] = items.rating[index]
            arr[index] = temp
            setReviews(arr)
        }
    }, [data, items])

    if(isError){
        return null
    }

    return(
        <Fragment>
            {isLoading ? <Loader />
            : 
            data ? 
                <div className="reviews">
                    {reviews.map((elem, index)=><Review users={data as IUser[]} key={`${elem.user_id} ${index}`} review={elem}/>)}
                </div>  : null
            }
        </Fragment>
        
    )
}

export default Reviews 