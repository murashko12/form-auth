import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './query/authApi'
import { usersApi } from './query/usersApi'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer
    },
    middleware: (getDefaultMiddleware) => (    
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(usersApi.middleware)
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
