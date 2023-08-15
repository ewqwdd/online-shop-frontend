import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICharacteristics, IItems, IReview } from "../types";

export interface itemEditStore{
    edit: boolean;
    _id?: string;
    title?: string;
    description?: string;
    img?: string[];
    characteristics?: ICharacteristics[];
    rating?: IReview[];
    price?: string;
    url?: string;
    files?: File[];
}


let initialState: itemEditStore = {
    edit: false,
}

export let itemEditSlice = createSlice({
    name: "itemEditSlice",
    initialState,
    reducers:{
        show(state){
            state.edit = true
        },
        hide(state){
            state.edit = false
        },
        setTitle(state, action: PayloadAction<{title: string}>){
            state.title=action.payload.title
        },
        setDesc(state, action: PayloadAction<{description: string}>){
            let replaced = action.payload.description.replace(/\//g, "\n")
            console.log(replaced)
            state.description=replaced
        },
        setImg(state, action: PayloadAction<{img: string[]}>){
            state.img=action.payload.img
        },
        setChars(state, action: PayloadAction<{characteristics: ICharacteristics[]}>){
            state.characteristics=action.payload.characteristics
        },
        setPrice(state, action: PayloadAction<{price: string}>){
            state.price=action.payload.price
        },
        setFiles(state, action: PayloadAction<{files: File[]}>){
            state.files=action.payload.files
        }
        ,
        setItem(state, action: PayloadAction<IItems>){
            let {price, characteristics, title, description, img} = action.payload
            let replaced = description.replace(/\//g, "\n")
            state.price = String(price)
            state.characteristics = characteristics
            state.title = title
            state.description = replaced
            state.img = img
            state.files = []
        }
        ,
        setEmpty(state){
            state.price = undefined
            state.characteristics = undefined
            state.title = undefined
            state.description = undefined
            state.img = undefined
            state.files = undefined
        }
    }
}
)

export default itemEditSlice.reducer