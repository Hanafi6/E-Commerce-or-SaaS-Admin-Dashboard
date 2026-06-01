import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ['Product', 'Order', 'User', 'Notification'], // لتحديث البيانات تلقائياً عند التعديل
  endpoints: (builder) => ({
    // 1. Products Endpoints
    getProducts: builder.query({
      query: () => 'products',
      providesTags: ['Product'],
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: 'products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Product'],
    }),
    // 2. Orders Endpoints
    getOrders: builder.query({
      query: () => 'orders',
      providesTags: ['Order'],
    }),
    // 3. Users Endpoints
    getUsers: builder.query({
      query: () => 'users',
      providesTags: ['User'],
    }),
    // 4. Notifications Endpoints
    getNotifications: builder.query({
      query: () => 'notifications',
      providesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useGetOrdersQuery,
  useGetUsersQuery,
  useGetNotificationsQuery,
} = apiSlice;