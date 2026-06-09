import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Product, Order, User, Notification, QueryArgs } from "@/types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: "https://6a2157b4b1d0aaf32b4f4137.mockapi.io/",
    })(args, api, extraOptions);

    return result;
  },
  tagTypes: ["Products", "Order", "User", "Notification"],
  endpoints: (builder) => ({

    getProducts: builder.query<Product[], QueryArgs>({
      query: (params) => ({
        url: "products",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: 10,
          search: params.search || undefined,
          category: params.category || undefined,
        },
      }),
    }),

    addProduct: builder.mutation<Product, Omit<Product, "id">>({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    getOrders: builder.query<Order[], void>({
      query: () => "orders",
      providesTags: ["Order"],
    }),

    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["User"],
    }),

    getNotifications: builder.query<Notification[], void>({
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