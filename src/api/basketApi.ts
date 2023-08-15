import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../config.js';
import { IBusket, IItems } from '../types.js';
import _ from 'lodash';

interface Params {
  username: string;
  token: string;
}

interface addToBasketParams {
  token: string;
  item: string;
}

export let basketApi = createApi({
  reducerPath: "basketApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Basket'],
  endpoints: (build) => ({
    fetchBasket: build.query<IBusket, Params>({
      query: ({ username, token }) => ({
        method: 'GET',
        url: `/baskets/${username}`,
        headers: { 'Authorization': `Bearer ${token}` },
      }),
      providesTags: ['Basket'],
    }),
    addToBasket: build.mutation<any, addToBasketParams>({
        query: ({ token, item }) => ({
            url: `/baskets`,
            method: "POST",
            body: { item_id: item },
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          invalidatesTags: ['Basket'],
        }),
    decrease: build.mutation<any, addToBasketParams>({
        query: ({ token, item }) => ({
            url: `/baskets/decrease`,
            method: "POST",
            body: { item_id: item },
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          invalidatesTags: ['Basket'],
        }),
    buy: build.mutation<any, {token: string}>({
      query: ({token})=>({
        url: `/baskets/buy`,
        method: "POST",
        headers: { 'Authorization': `Bearer ${token}` },
      }),
      invalidatesTags: ['Basket'],
    })  
  }),
  
});