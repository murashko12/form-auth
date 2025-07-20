import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './query/authApi'
import { usersApi } from './query/usersApi'

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