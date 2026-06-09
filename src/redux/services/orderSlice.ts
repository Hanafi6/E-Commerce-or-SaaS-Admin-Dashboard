// orderApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://6a215c52b1d0aaf32b4f4801.mockapi.io/",
  }),

  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "orders",
    }),
  }),
});

export const { useGetOrdersQuery } = orderApi;
