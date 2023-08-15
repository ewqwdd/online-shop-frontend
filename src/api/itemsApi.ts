import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {baseUrl} from '../config.js'
import { ICharacteristics, IItems } from '../types.js';
import _ from 'lodash'

interface AddItemParams{
    title: string;
    img:string[];
    characteristics:ICharacteristics[];
    description: string;
    price: number | undefined;
    token: string;
    files: File[];
}

interface DeleteItemParams{
    id: string;
    token: string;
}

interface UpdateItemsParams extends IItems{
    token: string;
    files: File[]
}

export let itemsApi = createApi({
    reducerPath: "itemsApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    tagTypes: ['Items'],
    endpoints:(build)=>({
        fetchItems: build.query<{items: IItems[], total: number}, {limit?: number, page?: number, query?: string, priceFrom?: number, priceTo?: number}>({
            query: ({limit=1000, page=1, query="", priceFrom=0, priceTo=1000000})=>({
            url:'/items', params:{limit, page, query, priceFrom, priceTo}
        }),
        providesTags:["Items"]

        }),
        fetchItem: build.query<IItems, string>({
            query: (name)=>({
                url:`/items/${name}`}),
                providesTags: ['Items']
            }),
        fetchId: build.query<IItems, string>({
            query: (id)=>({
                url:`/items/id/${id}`}),
            providesTags: ['Items']
        }),
        addItem: build.mutation<any, AddItemParams>({query: ({token, title, img, description, characteristics, price, files})=>{

            let formData = new FormData()
            formData.append('title', title)
            formData.append('img', JSON.stringify(img))
            formData.append('description', description)
            formData.append('price', String(price))
            formData.append('characteristics', JSON.stringify(characteristics))
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
              }
            
            return{
            url:"/items",
            method:"POST",
            body:formData,
            headers: { 'Authorization': `Bearer ${token}` }
        }},
        invalidatesTags:['Items']
        }),
        deleteItem: build.mutation<any, DeleteItemParams>({query: ({token, id})=>({
            url:"/items",
            method:"DELETE",
            body:{id},
            headers: { 'Authorization': `Bearer ${token}` }
        }),
        invalidatesTags:['Items']
        }),
        updateItems: build.mutation<any, UpdateItemsParams>({query: ({_id, price, title, description, characteristics, img, token, files})=>{

            let formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            formData.append('price', String(price))
            formData.append('characteristics', JSON.stringify(characteristics))
            formData.append('img', JSON.stringify(img))
            console.log(img)
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
              }

            return{
            url: `/items/${_id}`,
            method: "PUT",
            body: formData,
            headers: { 'Authorization': `Bearer ${token}` }
            }
        },
        invalidatesTags:['Items']
        }),

        addReview: build.mutation<any, {token: string, text: string, value: number, id: string}>({
            query: ({token, text, value, id})=>({
                url: `/items/id/${id}/review`,
                method: 'POST',
                body: {text, value},
                headers: { 'Authorization': `Bearer ${token}` }
            }),
            invalidatesTags:['Items']
        
        })
    }),

})