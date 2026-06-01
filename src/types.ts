
// ─── الـ Model الأساسي للمستخدم ───────────────────
export interface IUser {
    id: string | number
    name: string
    email: string
    role: 'Admin' | 'User' | 'Editor'
    createdAt?: string // فيلداية إضافية هتشوفها دايماً في الباك-إيند الحقيقي
}

// ─── الـ Response اللي راجع من الـ Pagination ───
// صممنا الـ Interface ده بـ Generic <T> عشان لو حبيت تستخدمه بعد كده لـ بضاعة، بوستات، إلخ.
export interface IPaginatedResponse<T> {
    first: number
    prev: number | null
    next: number | null
    last: number
    pages: number
    items: number
    data: T[] // الـ Array الفعلي جواه الـ Generic Type
}

// تسهيلاً عليك، ده الـ Type الصريح لـ يوزرز الـ Dashboard
export type IGetUsersResponse = IPaginatedResponse<IUser>

// ─── الـ Params المبعوتة في الـ URL ────────────────
export interface IGetUsersArgs {
    page: number
    limit: number
    search?: string
}