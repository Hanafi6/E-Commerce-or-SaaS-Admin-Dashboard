// orderApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api",
  }),

  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "orders",
    }),
  }),
});

export const { useGetOrdersQuery } = orderApi;
