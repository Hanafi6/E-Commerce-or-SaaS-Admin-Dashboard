import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: "http://localhost:4000/api",
    })(args, api, extraOptions);

    return result;
  },
  tagTypes: ["Products", "Order", "User", "Notification"],
  endpoints: (builder) => ({
    // 1. Products Endpoints
    getProducts: builder.query({
      query: () => ({
        url: "products",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    // 2. Orders Endpoints
    getOrders: builder.query({
      query: () => "orders",
      providesTags: ["Order"],
    }),
    // 3. Users Endpoints
    getUsers: builder.query({
      query: () => "users",
      providesTags: ["User"],
    }),
    // 4. Notifications Endpoints
    getNotifications: builder.query({
      query: () => "notifications",
      providesTags: ["Notification"],
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
