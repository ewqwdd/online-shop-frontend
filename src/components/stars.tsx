import React, { FC } from 'react'
import { IReview } from '../types'

const Stars: FC<{value: number}> = ({value})=>{

    let marks = [2, 4, 6, 8, 10]

    return(
        <div className="stars">
            {marks.map(elem=><img className="star" key={`star ${elem}`} src={value >= elem ? "/star-yellow.svg" : "/star.svg" } />)}
        </div>
    )
}

export default Stars;