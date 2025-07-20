import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { MyData } from '../types/auth'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/api/v1/auth/login',
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }),
        getMe: builder.query<MyData, void>({
            query: () => '/api/v1/auth/me'
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/api/v1/auth/logout',
                method: 'POST'
            })
        })
    })
})

export const { 
    useLoginMutation, 
    useGetMeQuery, 
    useLogoutMutation 
} = authApi