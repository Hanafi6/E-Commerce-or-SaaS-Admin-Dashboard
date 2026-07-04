import React, { useMemo, useEffect, useState } from "react";


import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ChartAreaInteractive } from "./ui/chart-area-interactive";
import { Order } from "@/types";
import { ChartConfig } from "./ui/chart";
import { Button } from "./ui/button";
import { CustomeBarChart } from "./ui/ChartLineInteractive";


interface MicroAnalyticsBridgeProps {
    orders: any[];
    users: any[];
    products: any[];
}

interface AnalysisMeta {
    title: string
    description: string
}

export type DailySales = Record<string, { date: string; total: number }>;


export const MicroAnalyticsBridge: React.FC<MicroAnalyticsBridgeProps> = ({
    orders = [],
    users = [],
    products = [],
}) => {
    const { t } = useTranslation();

    const [wicheAnalysesWillShowed, setWicheAnalysesWillShowed] = useState<"OrderAnalyses" | "CustomerInsights">('OrderAnalyses')



    const
        { title, description }: AnalysisMeta = wicheAnalysesWillShowed === "CustomerInsights"
            ? {
                title: t("Customer Insights"),
                description: t(
                    "Analyze customer behavior, engagement patterns, and purchasing activity."
                ),
            }
            : {
                title: t("Order Status Analytics"),
                description: t(
                    "Track order status distribution and monitor fulfillment performance over time."
                ),
            }

    useMemo(() => [
        t("Order Value ($)"),
        t("Total User Orders"),
        t("Customer Activity & Order Value Bridge"),
        t("Real-time overview of recent customer orders, matching their current ticket size with total store history."),
        t("Users"),
        t("Products")
    ], [t]);

    const [colors, setColors] = useState<Record<string, string>>({
        chart1: "",
        chart2: "",
        muted: "",
        border: "",
        card: "",
    });

    useEffect(() => {
        const updateChartColors = () => {
            const style = getComputedStyle(document.documentElement);
            setColors({
                chart1: style.getPropertyValue("--chart-1").trim(),
                chart2: style.getPropertyValue("--chart-2").trim(),
                muted: style.getPropertyValue("--muted-foreground").trim(),
                border: style.getPropertyValue("--border").trim(),
                card: style.getPropertyValue("--card").trim(),
            });
        };

        requestAnimationFrame(updateChartColors);
        window.addEventListener("theme-changed", updateChartColors);
        window.addEventListener("storage", updateChartColors);

        return () => {
            window.removeEventListener("theme-changed", updateChartColors);
            window.removeEventListener("storage", updateChartColors);
        };
    }, []);

    // const { chartData, options } = useMemo(() => {
    //     if (orders.length === 0 || !colors.chart1) {
    //         return { chartData: { labels: [], datasets: [] }, options: {} };
    //     }

    //     const sampleOrders = orders.slice(0, 5);
    //     const labels = sampleOrders.map((order: any) => order.customerName || `User ${order.userId}`);
    //     const revenueData = sampleOrders.map((order: any) => Number(order.totalPrice || 0));
    //     const userTotalOrdersCount = sampleOrders.map((order: any) =>
    //         orders.filter((o: any) => o.userId === order.userId).length
    //     );

    //     const data = {
    //         labels,
    //         datasets: [
    //             {
    //                 label: t("Order Value ($)"),
    //                 data: revenueData,
    //                 backgroundColor: colors.chart1,
    //                 borderRadius: 6,
    //                 barThickness: 16,
    //                 yAxisID: 'y',
    //             },
    //             {
    //                 label: t("Total User Orders"),
    //                 data: userTotalOrdersCount,
    //                 backgroundColor: colors.chart2,
    //                 borderRadius: 6,
    //                 barThickness: 16,
    //                 yAxisID: 'y1',
    //             },
    //         ],
    //     };

    //     const chartOptions = {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         plugins: {
    //             legend: {
    //                 position: "bottom" as const,
    //                 labels: { color: colors.muted, font: { size: 11, family: "inherit" } },
    //             },
    //             tooltip: {
    //                 backgroundColor: colors.card,
    //                 titleColor: colors.chart1,
    //                 bodyColor: colors.muted,
    //                 borderColor: colors.border,
    //                 borderWidth: 1,
    //             },
    //         },
    //         scales: {
    //             x: { grid: { display: false }, ticks: { color: colors.muted } },
    //             y: { grid: { color: colors.border }, ticks: { color: colors.muted } },
    //             y1: { grid: { drawOnChartArea: false }, ticks: { color: colors.muted } },
    //         },
    //     };

    //     return { chartData: data, options: chartOptions };
    // }, [orders, colors, t]);

    const OrderAnalysesDataConfig = {
        Paid: { label: "Paid", color: "var(--chart-1)" },
        failed: { label: "failed", color: "var(--chart-4)" },
        Pending: { label: "Pending", color: "var(--chart-3)" },
    } satisfies ChartConfig;


    const CustomerInsightsDataConfig = {
        revenue: {
            label: "Revenue",
            color: "var(--chart-1)",
        },
        orders: {
            label: "Orders",
            color: "var(--chart-2)",
        },
    }

    const OrderAnalysesData = useMemo(() => {
        if (!orders || orders.length === 0) return [];

        const dailyStats = orders.reduce((acc:
            any
            , order: Order) => {
            const date = new Date(order.time).toISOString().split('T')[0];
            if (!acc[date]) {
                acc[date] = { date, Paid: 0, failed: 0, Pending: 0 };
            }
            if (order.status === 'Paid') {
                acc[date].Paid += 1;
            } else if (order.status === 'Pending') {
                acc[date].Pending += 1;
            } else {
                acc[date].failed += 1;
            }
            return acc;
        }, {});

        return Object.values(dailyStats).sort((a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    }, [orders]);


    const CustomerInsightsData = useMemo(() => {
        return orders.reduce((acc: any, order: Order) => {
            const date = new Date(order.time)
                .toISOString()
                .split("T")[0]

            const existing = acc.find(
                item => item.date === date
            )

            if (existing) {
                existing.revenue += Number(order.totalPrice)
            } else {
                acc.push({
                    date,
                    revenue: Number(order.totalPrice),
                })
            }

            return acc
        }, [] as {
            date: string
            revenue: number
        }[])
    }, [orders])

    const currntChart = wicheAnalysesWillShowed == 'OrderAnalyses' ? <ChartAreaInteractive
        chartData={OrderAnalysesData}
        chartConfig={OrderAnalysesDataConfig}
        title="Sales Report"
    />
        : <CustomeBarChart
            chartData={CustomerInsightsData}
            chartConfig={CustomerInsightsDataConfig}
            title="Sales Report"
        />

    return (
        <div className="w-full space-y-4 my-6" dir="ltr">
            <Card className="bg-card border-border shadow-sm">
                <CardHeader className="flex flex-col sm:flex-row items-start justify-between pb-4 border-b border-border/60">

                    <div className=" flex flex-col gap-5 lg:flex-row md:flex-row">
                        <Button
                            className={` cursor-pointer ${wicheAnalysesWillShowed == "OrderAnalyses" ? '' : 'bg-secondary text-custom-text'}`}
                            onClick={() => setWicheAnalysesWillShowed('OrderAnalyses')}
                        >Order Status</Button>
                        <Button
                            className={` cursor-pointer ${wicheAnalysesWillShowed == "OrderAnalyses" ? 'bg-secondary text-custom-text' : ''}`}
                            onClick={() => setWicheAnalysesWillShowed('CustomerInsights')}
                        >Customer Insights</Button>
                    </div>

                    <div className="space-y-1 text-left mr-4 ml-4">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground self-end sm:self-center">
                        <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-md border border-border/40">
                            <Users className="w-3.5 h-3.5 text-primary" />
                            <span>{users.length} {t("Users")}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-md border border-border/40">
                            <Package className="w-3.5 h-3.5 text-primary" />
                            <span>{products.length} {t("Products")}</span>
                        </div>
                    </div>
                </CardHeader>



                {currntChart}

            </Card>
        </div>
    );
};

export default React.memo(MicroAnalyticsBridge);