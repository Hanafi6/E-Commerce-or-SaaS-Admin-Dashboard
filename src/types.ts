import { store } from "@/redux/store";


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

// 👤 1. تايب المستخدم (User)
export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: boolean;
    avatar: string;
    password?: string; // اختياري عشان الأمان لو مش هتحتاجها في الـ UI
  }
  
  // 📦 2. تايب المنتج (Product)
  export interface Product {
    id: number;
    name: string;
    price: number;
    image: string; // بيدعم الـ Base64 أو الـ URLs عادي
    category: string;
    stock: number;
  }
  
  // 🛒 3. تايب الطلب (Order)
  export interface Order {
    id: number;
    userId: number;
    totalPrice: number;
    customerName: string;
    time: string; // '1/18/2026'
    status: "Success" | "Failed" | "Pending" | string; // كتبنا الستيتس الشائعة مع مرونة الـ string
  }
  
  // 🔔 4. تايب التنبيهات (Notification)
  export interface Notification {
    id: number;
    type: "user" | "order" | "system" | string;
    message: string;
    isRead: boolean;
    time: string;
  }
  
  // 🌍 5. تايب الـ API Responses الموحد (للـ Pagination والـ Meta)
  export interface ApiResponse<T> {
    data: T[];
    meta: {
      totalCount: number;
      page: number;
      pageSize: number;
      totalPages: number;
    };
  }

  // الـ Args المتوقعة للـ Queries (مثل الفلترة والـ Pagination)
export interface QueryArgs {
    page?: number;
    search?: string;
    category?: string;
    userId?: number;
  }