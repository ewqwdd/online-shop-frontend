import { useRef } from "react"

export let useDebounce = (fn: Function, t: number)=>{
    let timer = useRef<ReturnType<typeof setTimeout>>()

    return [(...args: any[])=>{
        if(timer.current){
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(()=>{fn(args)}, t)
    },
    ()=>{
        if(timer.current){
            clearTimeout(timer.current)
        }
    }
    ]
}