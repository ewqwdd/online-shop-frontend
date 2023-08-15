import { IItemsWithAvg } from "./types";

export let sortByAvgDec = (avgData: IItemsWithAvg[])=>{

    return avgData.sort((a, b)=>{
        if (!a.avg) {
            a = { avg: 0, ...a };
        }
        if (!b.avg) {
            b = { avg: 0, ...b };
        }
        if(a.avg! >b.avg!){
            return -1
        }
        else{
            return 1
        }
    })
}

export let sortByAvgInc = (avgData: IItemsWithAvg[])=>{

    return avgData.sort((a, b)=>{
        if (!a.avg) {
            a = { avg: 0, ...a };
        }
        if (!b.avg) {
            b = { avg: 0, ...b };
        }
        if(a.avg! >b.avg!){
            return 1
        }
        else{
            return -1
        }
    })
}

export let sortByPriceInc = (avgData: IItemsWithAvg[])=>{

    return avgData.sort((a, b)=>{
        if(a.price! >b.price!){
            return 1
        }
        else{
            return -1
        }
    })
}

export let sortByPriceDec = (avgData: IItemsWithAvg[])=>{

    return avgData.sort((a, b)=>{
        if(a.price! <b.price!){
            return 1
        }
        else{
            return -1
        }
    })
}