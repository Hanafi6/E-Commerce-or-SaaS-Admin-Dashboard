import { useGetUsersQuery } from "@/redux/services/apiSlice";
import { DollarSign, ShoppingBag, Users, ArrowUpRight } from "lucide-react";

const stats = [
  { title: "إجمالي المبيعات", value: "$45,231.89", change: "+12.5%", icon: DollarSign },
  { title: "الطلبات النشطة", value: "+3,245", change: "+8.2%", icon: ShoppingBag },
  { title: "العملاء الجدد", value: "+1,240", change: "-2.1%", icon: Users },
];

export default function Home() {

  return (
    <div className="space-y-6 text-right">
      <div>
        <h2 className="text-lg font-bold text-foreground m-0">مؤشرات الأداء العامة</h2>
        <p className="text-xs text-muted-foreground">متابعة حية ومباشرة لحالة المتجر اليوم.</p>
      </div>

      {/* شبكة الكروت المتجاوبة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-between transition-all hover:shadow-md">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-xl font-bold text-foreground m-0 tracking-tight">{stat.value}</h3>
                <span className={`inline-flex items-center gap-0.5 text-[11px] font-medium px-2 py-0.5 rounded-full ${stat.change.startsWith("+") ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"
                  }`}>
                  <ArrowUpRight className="w-3 h-3" /> {stat.change}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* مكان الـ Charts في الخطوة الجاية */}
      <div className="h-64 rounded-2xl border border-border border-dashed bg-card flex items-center justify-center text-muted-foreground text-xs">
        مساحة الرسوم البيانية والتحليلات المتقدمة (الخطوة القادمة)
      </div>
    </div>
  );
}