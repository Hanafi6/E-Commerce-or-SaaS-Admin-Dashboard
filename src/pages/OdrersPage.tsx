// import { useGetOrdersQuery } from "@/redux/services/orderSlice";
import { ClipboardList, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";

export default function OdrersPage() {
  // const { data, isError, isLoading } = useGetOrdersQuery("");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">
          سجلات حركات البيع والطلبات
        </h2>
        <p className="text-xs text-muted-foreground">
          متابعة حالة الطلبات، الفواتير، وعمليات الشحن.
        </p>
      </div>

      {/* كروت سريعة خاصة بالطلبات */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-xl border border-border flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground font-medium">
              طلبات قيد الانتظار
            </span>
            <h4 className="text-lg font-bold">45 طلب</h4>
          </div>
          <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground font-medium">
              تم شحنها اليوم
            </span>
            <h4 className="text-lg font-bold">120 طلب</h4>
          </div>
          <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground font-medium">
              الطلبات المكتملة
            </span>
            <h4 className="text-lg font-bold">3,080 طلب</h4>
          </div>
          <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* مكان جدول الطلبات */}
      <div className="border border-dashed border-border rounded-2xl h-80 flex flex-col items-center justify-center bg-card text-center p-6">
        <div className="p-3 bg-muted rounded-full mb-3 text-muted-foreground">
          <ClipboardList className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold mb-1">قائمة فواتير المبيعات</h3>
        <p className="text-xs text-muted-foreground">
          شاشة عرض حركات البيع المباشرة وتحديث حالات الدفع.
        </p>
      </div>
    </div>
  );
}
