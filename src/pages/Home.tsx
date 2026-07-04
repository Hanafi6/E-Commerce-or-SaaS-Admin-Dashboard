import { lazy, Suspense, useMemo, useEffect, useRef, useState } from "react";
import { useGetUsersQuery } from "@/redux/services/userSlice";
import { useGetOrdersQuery } from "@/redux/services/orderSlice";
import { useGetProductsQuery } from "@/redux/services/apiSlice";
import { DollarSign, ShoppingBag, Users, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";


const MicroAnalyticsBridge = lazy(() => import("@/components/MicroAnalyticsBridge"));
const AnalyticsCharts = lazy(() => import("@/components/AnalyticsCharts"));


function AnimatedValue({ textValue }: { textValue: string }) {
  return (
    <h3 className="text-xl font-bold text-foreground m-0 tracking-tight" dir="ltr">
      {textValue}
    </h3>
  );
}


function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-5 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-between animate-pulse"
        >
          <div className="space-y-2 text-start w-1/2">
            <div className="h-3 bg-muted rounded w-3/4"></div>
            <div className="h-6 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-1/2 mt-1"></div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-muted" />
        </div>
      ))}
    </div>
  );
}


export default function Home() {
  const { data: orders = [], isLoading: ordersLoading } = useGetOrdersQuery();
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery({ all: true });
  const { data: products = [], isLoading: productsLoading } = useGetProductsQuery({ all: true });


  const { t } = useTranslation();
  const [isChartsVisible, setIsChartsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isGlobalLoading = ordersLoading || usersLoading || productsLoading;

  useEffect(() => {
    if (ordersLoading) return;

    const node = containerRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setIsChartsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsChartsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px", threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ordersLoading]);

  const calculatedStats = useMemo(() => {
    if (ordersLoading || usersLoading) return [];

    const totalSales = orders.reduce((sum, order) => {
      return order.status === "Paid" ? sum + (Number(order.totalPrice) || 0) : sum;
    }, 0);

    let activeOrders = orders.filter(order => order.status === "Pending").length;
    let totalUsers = users.length;

    return [
      {
        title: t("Total sales (Paid)"),
        value: `$${totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        change: "+12.5%",
        icon: DollarSign
      },
      {
        title: t("Pending orders (Pending)"),
        value: `+${activeOrders}`,
        change: "+8.2%",
        icon: ShoppingBag
      },
      {
        title: t("Total customers"),
        value: `+${totalUsers}`,
        change: "-2.1%",
        icon: Users
      },
    ];
  }, [orders, users, ordersLoading, usersLoading]);



  return (
    <section className="space-y-6 text-center">
      <div>
        <h2 className="text-lg font-bold text-foreground m-0">
          {t("General performance indicators")}
        </h2>
        <p className="text-xs text-muted-foreground">
          {t("Live and direct monitoring of the store's status today.")}
        </p>
      </div>

      {
        isGlobalLoading ? (
          <StatsSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {calculatedStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="p-5 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                  <div className="space-y-1 text-start">
                    <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                    <AnimatedValue textValue={stat.value} />
                    <span className={`inline-flex items-center gap-0.5 text-[11px] font-medium px-2 py-0.5 rounded-full mt-1 ${stat.change.startsWith("+") ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"}`}>
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
        )
      }

      <div className="w-full min-h-[400px]">
        {!isGlobalLoading ? (
          <Suspense fallback={<div className="h-[400px] w-full bg-card rounded-2xl border border-border animate-pulse" />}>
            <MicroAnalyticsBridge orders={orders} users={users} products={products} />
          </Suspense>
        ) : (
          <div className="h-[400px] w-full bg-card rounded-2xl border border-border animate-pulse flex flex-col p-5 space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-full bg-muted/50 rounded w-full"></div>
          </div>
        )}
      </div>

      <div ref={containerRef} className="w-full min-h-[350px] rounded-2xl border border-dashed border-border/40">
        <Suspense
          fallback={
            <div className="h-64 w-full flex items-center justify-center text-xs text-muted-foreground animate-pulse">
              {t('Lodding')}
            </div>
          }
        >
          {isChartsVisible && !isGlobalLoading ? (
            <AnalyticsCharts orders={orders} />
          ) : (
            <div className="h-64 w-full flex items-center justify-center text-xs text-muted-foreground">
              {t("Scroll To Render Chart Section")}
            </div>
          )}
        </Suspense>
      </div>
    </section >
  );
}