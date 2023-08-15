import React, { FC } from 'react'
import { ICharacteristics } from '../types'

interface ICharaProps{
    elem: ICharacteristics;
}

const Chara: FC<ICharaProps> = ({elem})=>{
    return(
        <div className='chara'>
            <span className='bold'>{elem.name}</span>
            <span>{elem.value}</span>
        </div>
    )
    }
    
export default Chara;