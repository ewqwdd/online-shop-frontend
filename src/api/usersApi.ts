import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../config';
import { IUser } from '../types';


export let usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    tagTypes: ['Users'],
    endpoints: (build)=>({
        getUsers: build.query<IUser[], {token: string}>({query: ({token})=>({
            url: "/users",
            headers: { 'Authorization': `Bearer ${token}` }
            }),
            providesTags: ['Users']
        }),
        deleteUsers: build.mutation<IUser, {token: string, id: string}>({query: ({token, id})=>({
            method: "DELETE",
            url: `/users/${id}`,
            headers: { 'Authorization': `Bearer ${token}` }
        }),
        invalidatesTags:["Users"]
        }),
        postUsers: build.mutation<IUser, {token: string, username: string, email: string, password: string, role: string}>({query: ({token, username, email, password, role})=>({
            method: "POST",
            url: `/users/`,
            headers: { 'Authorization': `Bearer ${token}` },
            body: {email, username, password, role}
        }),
        invalidatesTags:["Users"]
        }),
        putUser: build.mutation<IUser, {token: string, id: string, email: string, username: string, role: string}>({query: ({token, id, email, role, username})=>({
            method: "PUT",
            url: `/users/${id}`,
            headers: { 'Authorization': `Bearer ${token}` },
            body:{email, username, role}
        }),
        invalidatesTags:["Users"]
        }),
        ifBoughtItem: build.query<any, {token: string, id: string}>({
            query:({token, id})=>({
                method: "GET",
                url: `/users/if-bought/${id}`,
                headers: { 'Authorization': `Bearer ${token}` },
            })
        }),
    })
})