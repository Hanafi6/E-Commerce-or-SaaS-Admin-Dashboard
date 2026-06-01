import { Plus, Search, Filter } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* الهيدر العلوي لادارة المنتجات */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">إدارة المخزون والمنتجات</h2>
          <p className="text-xs text-muted-foreground">إضافة، تعديل، ومتابعة كميات المنتجات المتوفرة.</p>
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

      {/* الـ Placeholder بتاع الجدول (الخطوة القادمة للـ TanStack Table) */}
      <div className="border border-dashed border-border rounded-2xl h-96 flex flex-col items-center justify-center bg-card text-center p-6">
        <div className="p-3 bg-muted rounded-full mb-3 text-muted-foreground">
          <Search className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold mb-1">جدول المنتجات</h3>
        <p className="text-xs text-muted-foreground max-w-sm">
          هنا هيتم عرض المنتجات بـ استخدام TanStack Table مع الـ Server-side pagination والـ Sorting.
        </p>
      </div>
    </div>
  );
}