import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { QueryArgs, User } from "@/types";

export const usersSlice = createApi({
    reducerPath: "usersApi",
    baseQuery: async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_PRODUCTS_API,
        })(args, api, extraOptions);

        return result;
    },
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], QueryArgs | void>({
            query: (params) => {
                const isGetAll = params?.all

                return {
                    url: "/users",
                    method: "GET",
                    params: {
                        page: isGetAll ? undefined : (params?.page || 1),
                        limit: isGetAll ? undefined : 10,
                        search: params?.search || undefined,
                    },
                }
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "Users" as const, id })),
                        { type: "Users", id: "LIST" },
                    ]
                    : [{ type: "Users", id: "LIST" }],
        }),

        addUser: builder.mutation<User, Omit<User, "id">>({
            query: (newUser) => ({
                url: "/users",
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: [{ type: "Users", id: "LIST" }],
        })
    }),
});

export const {
    useAddUserMutation,
    useGetUsersQuery,
} = usersSlice;