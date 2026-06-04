import { useGetProductsQuery } from "@/redux/services/apiSlice";
import { Plus, Search, Filter, Loader2, AlertCircle } from "lucide-react";

export default function ProductsPage() {
  const { data: products, isLoading, isError } = useGetProductsQuery("");

  console.log({ products, isLoading, isError });
  return (
    <div className="space-y-6" dir="rtl">
      <button onClick={() => {}}>Refetch</button>
      {/* الهيدر العلوي لادارة المنتجات */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            إدارة المخزون والمنتجات
          </h2>
          <p className="text-xs text-muted-foreground">
            إضافة، تعديل، ومتابعة كميات المنتجات المتوفرة.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-semibold hover:bg-primary/90 transition-colors cursor-pointer w-fit">
          <Plus className="w-4 h-4" />
          <span>إضافة منتج جديد</span>
        </button>
      </div>

      {/* شريط الفلترة والبحث */}
      <div className="flex flex-col sm:flex-row gap-3 bg-card p-4 rounded-xl border border-border">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="البحث باسم المنتج أو الـ SKU..."
            className="w-full bg-background border border-border rounded-lg pr-9 pl-3 py-2 text-xs focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 border border-border px-4 py-2 rounded-lg text-xs hover:bg-muted transition-colors cursor-pointer justify-center">
          <Filter className="w-4 h-4" />
          <span>تصفية متقدمة</span>
        </button>
      </div>

      {/* عرض البيانات بناءً على حالة الـ الكاش */}
      <div className="border border-border rounded-2xl min-h-96 bg-card p-6 overflow-hidden">
        {/* 1. حالة التحميل (Loading) */}
        {isLoading && (
          <div className="h-80 flex flex-col items-center justify-center text-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
            <p className="text-xs text-muted-foreground">
              جاري جلب المنتجات من السيرفر...
            </p>
          </div>
        )}

        {/* 2. حالة حدوث خطأ (Error) */}
        {isError && (
          <div className="h-80 flex flex-col items-center justify-center text-center text-destructive">
            <AlertCircle className="w-8 h-8 mb-2" />
            <h3 className="text-sm font-semibold mb-1">فشل تحميل البيانات</h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              {error && "status" in error
                ? `خطأ: ${error.status}`
                : "حدث خطأ غير متوقع"}
            </p>
          </div>
        )}

        {/* 3. حالة الكاش فاضي (No Products) */}
        {!isLoading && !isError && products.length === 0 && (
          <div className="h-80 flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-muted rounded-full mb-3 text-muted-foreground">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold mb-1">لا توجد منتجات</h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              لم نجد أي منتجات مسجلة في النظام حالياً. اضغط على إضافة منتج جديد
              للبدء.
            </p>
          </div>
        )}

        {/* 4. عرض الجدول عند نجاح جلب البيانات */}
        {!isLoading && !isError && products.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-medium">
                  <th className="pb-3 pt-2 font-semibold">المعرف (ID)</th>
                  <th className="pb-3 pt-2 font-semibold">اسم المنتج</th>
                  <th className="pb-3 pt-2 font-semibold">السعر</th>
                  <th className="pb-3 pt-2 font-semibold">الكمية بالمخزن</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product: any) => (
                  <tr
                    key={product.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 font-mono text-muted-foreground">
                      #{product.id}
                    </td>
                    <td className="py-3 font-semibold">
                      {product.name || product.title}
                    </td>
                    <td className="py-3">{product.price} جنيه</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          product.stock > 0
                            ? "bg-green-500/10 text-green-500"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {product.stock ?? 0} قطعة
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
