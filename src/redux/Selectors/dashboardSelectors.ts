import { createSelector } from "@reduxjs/toolkit";
import {   Order, Notification, ApiResponse, QueryArgs } from "@/types";
import { apiSlice } from "@/redux/services/apiSlice";


// --------------------------------------------------------------------------
// 📦 1. المنتجات (Products Selectors)
// --------------------------------------------------------------------------

// Selector مخصص لجلب أصل الـ Response من الـ Cache (مثال لـ productsApi)
const selectProductsResult = apiSlice.endpoints.getProducts.select(undefined); // undefined لو مفيش باراميترز

// 2. بنعمل الـ Selector الصافي اللي بياخد الـ Result ويطلع منها الـ data
export const selectAllProducts = createSelector(
  [selectProductsResult],
  (productsResult) => {
    // productsResult هنا بيكون عبارة عن Object فيه (data, status, error, etc.)
    return productsResult.data ?? []; // لو الداتا لسه مش موجودة في الكاش هيرجع []
  }
);
// لير جلب الـ Meta للـ Pagination
export const selectProductsMeta = createSelector(
  [selectProductsResult],
  (result) => result?.meta || { totalCount: 0, page: 1, pageSize: 10, totalPages: 1 }
);

// لير متقدمة: فلترة المنتجات ذات المخزون الحرج (أقل من 5 قطع مثلاً)
export const selectCriticalStockProducts = createSelector(
  [selectAllProducts],
  (products) => products.filter((product) => product.stock <= 5)
);

// --------------------------------------------------------------------------
// 🛒 2. الطلبات (Orders Selectors)
// --------------------------------------------------------------------------

const selectOrdersResult = (state: any, queryArgs: QueryArgs) => 
  state.ordersApi?.queries[`getOrders(${JSON.stringify(queryArgs)})`]?.data as ApiResponse<Order> | undefined;

export const selectAllOrders = createSelector(
  [selectOrdersResult],
  (result) => result?.data || []
);

// 💡 الخازوق اللي طلبته: لير جلب طلبات مستخدم معين فقط (Mix Selector)
export const selectOrdersByUserId = createSelector(
  [selectAllOrders, (_state: any, _args: QueryArgs, userId: number) => userId],
  (orders, userId) => orders.filter((order) => order.userId === userId)
);

// لير جلب الطلبات الفاشلة (Failed) لمتابعة المشاكل فوراً
export const selectFailedOrders = createSelector(
  [selectAllOrders],
  (orders) => orders.filter((order) => order.status === "Failed")
);

// --------------------------------------------------------------------------
// 🔔 3. التنبيهات (Notifications Selectors)
// --------------------------------------------------------------------------

const selectNotificationsResult = (state: any) => 
  state.notificationsApi?.queries['getNotifications']?.data as Notification[] | undefined;

export const selectAllNotifications = createSelector(
  [selectNotificationsResult],
  (notifications) => notifications || []
);

// لير التنبيهات غير المقروءة فقط (للـ Badge اللي على الجرس في النيفبار)
export const selectUnreadNotifications = createSelector(
  [selectAllNotifications],
  (notifications) => notifications.filter((notif) => !notif.isRead)
);