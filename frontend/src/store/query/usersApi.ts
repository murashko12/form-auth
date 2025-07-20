import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '../types/auth'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1',
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        // Получение списка пользователей
        getUsers: builder.query<User[], void>({
        query: () => '/users',
        providesTags: (result) =>
            result
            ? [...result.map(({ id }) => ({ type: 'User' as const, id })), 'User']
            : ['User']
        }),
        // Получение конкретного пользователя
        getUserById: builder.query<User, string>({
            query: (id) => `/users/${id}`,
            providesTags: (result, error, id) => [{ type: 'User', id }]
        }),
        // Создание пользователя
        createUser: builder.mutation<User, Partial<User>>({
            query: (body) => ({
                url: '/users',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User']
        }),
        // Обновление пользователя
        updateUser: builder.mutation<User, { id: string; changes: Partial<User> }>({
            query: ({ id, changes }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: changes,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }]
        }),
        // Удаление пользователя
        deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'User', id }]
        })
    })
})

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApi