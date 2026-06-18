// orderApi.ts
import { Order, QueryArgs } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_ORDERS_API,
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], QueryArgs | void>({
      query: (params) => {
        return {
          url: "orders",
          method: "GET",
          params: {
            page: params?.page || 1,
            //   search: params?.search || undefined,
            //   // تقدر تضيف باقي الفلاتر هنا عشان الـ MockAPI يفلتر الداتا من السيرفر
            //   status: params?.status || undefined,
          },
        };
      },
      keepUnusedDataFor: 0,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: "Orders" as const, id })),
            { type: "Orders", id: "LIST" },
          ]
          : [{ type: "Orders", id: "LIST" }],
    }),
  }),
});

export const { useGetOrdersQuery } = orderApi;