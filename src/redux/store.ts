import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from '@/redux/services/apiSlice'
import { orderApi } from './services/orderSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [orderApi.reducerPath]:orderApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
          .concat(apiSlice.middleware)
          .concat(orderApi.middleware),
    
})



setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch
// export type AppStore = typeof store
