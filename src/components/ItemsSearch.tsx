import React, { FC, useEffect, useState } from 'react'
import EditButton from '../UI/edit-button/redButton'
import Input from '../UI/input/Input'
import { useDebounce } from '../hooks/debounce'

let ItemsSearch: FC<{setQuery: (arg: string)=>void}> = ({setQuery})=>{
    
    let [search, setSearch] = useState<string>("")

    let [confirm, clear] = useDebounce(()=>{
        setQuery(search)
    }, 2000) 
    
    useEffect(()=>{
        confirm()
    }, [search])

    let handleClick = ()=>{
        clear()
        setQuery(search)
    }

    return(
        <div className='items-search'>
            <Input placeholder="search" value={search} onChange={
                (e)=>{
                    setSearch(e.target.value)
                    if(e.target.value===""){
                        setQuery("")
                    }
                }
            }/>
            <EditButton onClick={handleClick}><img src="/search.svg" /></EditButton>
        </div>
    )
}

export default ItemsSearch