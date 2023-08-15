import React, { FC } from "react"
import { IReview } from "../types"
import Stars from "./stars"

const Review: FC<{review: IReview, users: {_id: string, username: string}[]}> = ({review, users})=>{

    let username = users.find((elem)=>elem._id==review.user_id)?.username

    const marks = [2, 4, 6, 8, 10]

    return(
        <div className="review">
            <Stars value={review.value} />
            <h3>{username}</h3>
            <p>{review.text}</p>
        </div>
    )
}

export default Review