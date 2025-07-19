import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000',
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
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
        getMe: builder.query({
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

export const { useLoginMutation, useGetMeQuery, useLogoutMutation } = authApi