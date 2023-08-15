import React, { Fragment, MouseEventHandler, useEffect, useMemo, useRef, useState } from 'react'
import { itemsApi } from '../api/itemsApi'
import Loader from '../UI/Loader/Loader'
import ItemsList from '../components/itemsList'
import { IItems, IItemsWithAvg } from '../types'
import useMessage from '../hooks/useMessage'
import Input from '../UI/input/Input'
import EditButton from '../UI/edit-button/redButton'
import ItemFilters from '../components/ItemsFilters'
import ItemsSearch from '../components/ItemsSearch'
import ItemPriceMinMax from '../components/ItemPriceMinMax'
import { useMediaQuery } from 'react-responsive'
import Select from '../UI/select/Select'
import { sortByAvgDec, sortByAvgInc, sortByPriceDec, sortByPriceInc } from '../sort'

const Items = ()=>{

    let message = useMessage()

    let [limit, setLimit] = useState<number>(10)
    let [total, setTotal] = useState<number>(0)
    let [query, setQuery] = useState<string>("")
    let [min, setMin] = useState<number>(0)
    let [max, setMax] = useState<number>(1000000) 
    let [isInitialized, setIsInitialized] = useState<boolean>(false)
    let [filtersShow, setFiltersShow] = useState<boolean>(false)
    let [isRows, setIsRows] = useState<boolean>(false)
    let mobile = useMediaQuery({maxWidth: "720px"})
    let minimalForGrid = useMediaQuery({minWidth: "394px"})
    let [sortVal, setSortVal] = useState<string>("Customer review: high to low")

    let lastElem = useRef<HTMLDivElement | null>(null)

    let observer = useRef<IntersectionObserver>()

    let {data, isLoading, isError} = itemsApi.useFetchItemsQuery({ limit, page: 1, query, priceFrom: min, priceTo: max })

    let [avgData, setAvgData] = useState<IItemsWithAvg[]>([])
    
    if (isError) {
        message("Error occurred while fetching data.", false)
      }
    
    useEffect(()=>{
        if(data && !isInitialized){
            setTotal(data.total)
            setIsInitialized(true)
        }
    }, [data])

    useEffect(()=>{
        if(data){
            let temp: IItemsWithAvg[] = [...data.items]
            temp.forEach((elem, index, array)=>{
                let foundIndex = avgData.findIndex(item=>item._id == elem._id)
                if(foundIndex===-1){
                        let avg = 0;
                    elem.rating.forEach((review)=>{
                        avg+=review.value
                    })
                    let num = avg / elem.rating.length
                    if(Number.isNaN(num)){
                        num=0
                    }
                    array[index] = {avg:num, ...elem}
                }
                else{
                    array[index] = array[foundIndex]
                }
            })
            setAvgData(temp)
        }
    }, [data])

    useEffect(()=>{
        if(observer.current!=undefined){
            observer.current.disconnect()
        }
        
        observer.current = new IntersectionObserver((entries, )=>{
            if(entries[0].isIntersecting && limit<total){
                setLimit(limit+10)
            }
        })
        if(!isLoading){
             //@ts-ignore
            observer.current.observe(lastElem.current)
        }
        

    }, [data, total])

    let sorted = useMemo(()=>{
        if(sortVal === "Customer review: high to low"){
            return sortByAvgDec(avgData)
        }
        else if(sortVal === "Customer review: low to high"){
            return sortByAvgInc(avgData)
        }
        else if(sortVal === "Price: low to high"){
            return sortByPriceInc(avgData)
        }
        else if(sortVal === "Price: high to low"){
            return sortByPriceDec(avgData)
        }
        else{
            return avgData
        }
        
    }, [avgData, sortVal])


    let sortingTypes = [
        {title: "Customer review: high to low", value: "Customer review: high to low"}, 
        {title: "Customer review: low to high", value: "Customer review: low to high"}, 
        {title: "Price: low to high", value: "Price: low to high"},
        {title: "Price: high to low", value: "Price: high to low"}]

    return(
        <div>
            {isLoading ? <Loader /> : null}
            {data ? 
            <Fragment>
                <div className='items-setting'>
                    <EditButton onClick={()=>{setFiltersShow(true)}}><img src="/filter.svg" /></EditButton>
                    {mobile && minimalForGrid ? 
                    <EditButton onClick={()=>{setIsRows(isRows ? false : true)}}>
                        {isRows ? <img src="/rows.svg" /> : <img src="/grid.svg" />}
                    </EditButton>
                    : null}
                </div>
                
                <div className='items-page'>
                    <ItemFilters filtersShow={filtersShow} setFiltersShow={setFiltersShow}>
                        <h3>Sort by:</h3>
                        <Select title="sort by" value={sortVal} onChange={(e)=>{setSortVal(e.target.value)}} vals={sortingTypes} />
                        <ItemsSearch setQuery={setQuery} />
                        <ItemPriceMinMax setMin={setMin} setMax={setMax} />
                    </ItemFilters>
                    <ItemsList isRows={isRows} items={sorted} /> 
                </div>
            </Fragment>: 
            null}
            {isLoading ? null : <div ref={lastElem} style={{height:"100px"}} />}
        </div>
    )

}

export default Items