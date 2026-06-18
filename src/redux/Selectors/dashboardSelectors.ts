import { createSelector } from "@reduxjs/toolkit";
import { Order, Notification, ApiResponse, QueryArgs } from "@/types";
import { apiSlice } from "@/redux/services/apiSlice";


const selectProductsResult = apiSlice.endpoints.getProducts.select(undefined); // undefined لو مفيش باراميترز

export const selectAllProducts = createSelector(
  [selectProductsResult],
  (productsResult) => {
    return productsResult.data ?? []; // لو الداتا لسه مش موجودة في الكاش هيرجع []
  }
);

export const selectProductsMeta = createSelector(
  [selectProductsResult],
  (result) => result?.meta || { totalCount: 0, page: 1, pageSize: 10, totalPages: 1 }
);

export const selectCriticalStockProducts = createSelector(
  [selectAllProducts],
  (products) => products.filter((product) => product.stock <= 5)
);


const selectOrdersResult = (state: any, queryArgs: QueryArgs) =>
  state.ordersApi?.queries[`getOrders(${JSON.stringify(queryArgs)})`]?.data as ApiResponse<Order> | undefined;

export const selectAllOrders = createSelector(
  [selectOrdersResult],
  (result) => result?.data || []
);

export const selectOrdersByUserId = createSelector(
  [selectAllOrders, (_state: any, _args: QueryArgs, userId: number) => userId],
  (orders, userId) => orders.filter((order) => order.userId === userId)
);

export const selectFailedOrders = createSelector(
  [selectAllOrders],
  (orders) => orders.filter((order) => order.status === "Failed")
);

const selectNotificationsResult = (state: any) =>
  state.notificationsApi?.queries['getNotifications']?.data as Notification[] | undefined;

export const selectAllNotifications = createSelector(
  [selectNotificationsResult],
  (notifications) => notifications || []
);

export const selectUnreadNotifications = createSelector(
  [selectAllNotifications],
  (notifications) => notifications.filter((notif) => !notif.isRead)
);