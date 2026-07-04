import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from '@/redux/services/apiSlice'
import { orderApi } from './services/orderSlice'
import { usersSlice } from './services/userSlice'
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [usersSlice.reducerPath]: usersSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
            .concat(orderApi.middleware)
            .concat(usersSlice.middleware),

})



setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
