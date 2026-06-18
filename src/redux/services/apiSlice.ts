import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, Order, User, Notification, QueryArgs } from "@/types";

export const apiSlice = createApi({
  reducerPath: "ProductsApi",
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: "https://6a2157b4b1d0aaf32b4f4137.mockapi.io", // 👈 تنظيف الـ URL
    })(args, api, extraOptions);

    return result;
  },
  tagTypes: ["Products", "Orders", "Users", "Notification"],
  endpoints: (builder) => ({

    getProducts: builder.query<Product[], (QueryArgs & { all?: boolean }) | void>({
      query: (params) => {
        const isGetAll = params?.all === true;

        return {
          url: "/products",
          method: "GET",
          params: {
            search: params?.search || undefined,
            category: params?.category || undefined,

            // 💡 السحر هنا: لو all بـ true، الـ page والـ limit هيبقوا undefined ومش هيتبعتوا في الـ Request أصلاً
            page: isGetAll ? undefined : (params?.page || 1),
            limit: isGetAll ? undefined : 10,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: "Products" as const, id })),
            { type: "Products", id: "LIST" },
          ]
          : [{ type: "Products", id: "LIST" }],
    }),

    addProduct: builder.mutation<Product, Omit<Product, "id">>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    // // 2️⃣ الـ Orders
    // getOrders: builder.query<Order[], void>({
    //   query: () => "/orders",
    //   providesTags: (result) =>
    //     result
    //       ? [
    //         ...result.map(({ id }) => ({ type: "Order" as const, id })),
    //         { type: "Order", id: "LIST" },
    //       ]
    //       : [{ type: "Order", id: "LIST" }],
    // }),

    // // 3️⃣ الـ Users
    // getUsers: builder.query<User[], void>({
    //   query: () => "/users",
    //   providesTags: (result) =>
    //     result
    //       ? [
    //         ...result.map(({ id }) => ({ type: "Users" as const, id })),
    //         { type: "Users", id: "LIST" },
    //       ]
    //       : [{ type: "Users", id: "LIST" }],
    // }),

    // // 4️⃣ الـ Notifications
    // getNotifications: builder.query<Notification[], void>({
    //   query: () => "/notifications",
    //   providesTags: (result) =>
    //     result
    //       ? [
    //         ...result.map(({ id }) => ({ type: "Notification" as const, id })),
    //         { type: "Notification", id: "LIST" },
    //       ]
    //       : [{ type: "Notification", id: "LIST" }],
    // }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  // useGetOrdersQuery,
  // useGetUsersQuery,
  // useGetNotificationsQuery,
} = apiSlice;