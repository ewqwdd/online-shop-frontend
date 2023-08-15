import React, { FC, useEffect, useState } from 'react'
import Input from '../UI/input/Input'
import { useDebounce } from '../hooks/debounce'

let ItemPriceMinMax: FC<{setMin: (arg: number)=>void, setMax: (arg: number)=>void}> = ({setMin, setMax})=>{

    let [maxInput, setMaxInput] = useState<string>("")
    let [minInput, setMinInput] = useState<string>("")

    let [confirm, clear] = useDebounce(()=>{
        if(maxInput!=""){
            setMax(Number(maxInput))
        }
        else{
            setMax(1000000)
        }
        setMin(Number(minInput))
    }, 1000)

    useEffect(()=>{
        confirm()
    }, [maxInput, minInput])

    return(
        <div className='price-filter'>
            <Input value={minInput} type="number" onChange={(e)=>{setMinInput(String(e.target.value))}} placeholder='Min'/>
            <Input value={maxInput} type="number" onChange={(e)=>{setMaxInput(String(e.target.value))}} placeholder='Max' />
        </div>
    )
}

export default ItemPriceMinMax;