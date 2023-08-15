import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface BasketPrice{
    [key: string]: number;
}

let initialState: BasketPrice = {}

export let basketPriceSlice = createSlice({
    name: "basketPriceSlice",
    initialState,
    reducers:{
        update(state, action: PayloadAction<{id: string, price:number}>){
            let {id, price} = action.payload;
            state[id] = price
        }
    }
}
)

export default basketPriceSlice.reducer