import { store } from "@/redux/store";

import { Table as TableInstance } from "@tanstack/react-table"; // 💡 import للـ type

// import { ColumnFiltersState } from "@tanstack/react-table";
// ─── الـ Model الأساسي للمستخدم ───────────────────
// export interface IUser {
//     id: string | number
//     name: string
//     email: string
//     role: 'Admin' | 'User' | 'Editor'
//     createdAt?: string // فيلداية إضافية هتشوفها دايماً في الباك-إيند الحقيقي
// }


// ─── الـ Response اللي راجع من الـ Pagination ───
// صممنا الـ Interface ده بـ Generic <T> عشان لو حبيت تستخدمه بعد كده لـ بضاعة، بوستات، إلخ.
// export interface IPaginatedResponse<T> {
//     first: number
//     prev: number | null
//     next: number | null
//     last: number
//     pages: number
//     items: number
//     data: T[] // الـ Array الفعلي جواه الـ Generic Type
// }

// تسهيلاً عليك، ده الـ Type الصريح لـ يوزرز الـ Dashboard
// export type IGetUsersResponse = IPaginatedResponse<IUser>

// ─── الـ Params المبعوتة في الـ URL ────────────────
// export interface IGetUsersArgs {
//     page: number
//     limit: number
//     search?: string
// }

export type RootState = ReturnType<typeof store.getState>;
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: boolean;
  avatar: string;
  password?: string;
}


export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  customerName: string;
  time: string; // '1/18/2026'
  status: "Success" | "Failed" | "Pending" | string; // كتبنا الستيتس الشائعة مع مرونة الـ string
}

export interface Notification {
  id: number;
  type: "user" | "order" | "system" | string;
  message: string;
  isRead: boolean;
  time: string;
}

export interface ApiResponse<T> {
  data: T[];
  meta: {
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface QueryArgs {
  page?: number;
  search?: string;
  category?: string;
  userId?: number;
  all?: boolean;
  status?: string;
}

export type FilterInputType = "select" | "custom-select" | "range";

export interface FilterColumnConfig {
  id: string;
  label: string;
  type: FilterInputType;

  options?: { value: string; label: string }[];

  rangeConfig?: {
    minPlaceholder?: string;
    maxPlaceholder?: string;
  };
}

export interface ITable<TData> {
  table: TableInstance<TData>
}
export type TypeOfGiniricType = "custom-select" | "range" | "select";

export interface FITERSType {
  id: string;
  label: string;
  type: TypeOfGiniricType;
  options?: { id: string; label: string }[];
  rangeConfig?: {
    minPlaceholder: string;
    maxPlaceholder: string;
    unit: string;
  };
}