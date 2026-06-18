import React, { useMemo, useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MicroAnalyticsBridgeProps {
    orders: any[];
    users: any[];
    products: any[];
}

export const MicroAnalyticsBridge: React.FC<MicroAnalyticsBridgeProps> = ({
    orders = [],
    users = [],
    products = [],
}) => {
    const { t } = useTranslation();

    // 💡 الخدعة: مصفوفة وهمية عشان الـ Parser يلم كل الكلمات اللي جوه الـ Chart
    // من غير المصفوفة دي، الـ Parser مش هيعرف يوصل للنصوص دي جوه الـ useMemo
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

    const { chartData, options } = useMemo(() => {
        if (orders.length === 0 || !colors.chart1) {
            return { chartData: { labels: [], datasets: [] }, options: {} };
        }

        const sampleOrders = orders.slice(0, 5);
        const labels = sampleOrders.map((order: any) => order.customerName || `User ${order.userId}`);
        const revenueData = sampleOrders.map((order: any) => Number(order.totalPrice || 0));
        const userTotalOrdersCount = sampleOrders.map((order: any) =>
            orders.filter((o: any) => o.userId === order.userId).length
        );

        const data = {
            labels,
            datasets: [
                {
                    label: t("Order Value ($)"),
                    data: revenueData,
                    backgroundColor: colors.chart1,
                    borderRadius: 6,
                    barThickness: 16,
                    yAxisID: 'y',
                },
                {
                    label: t("Total User Orders"),
                    data: userTotalOrdersCount,
                    backgroundColor: colors.chart2,
                    borderRadius: 6,
                    barThickness: 16,
                    yAxisID: 'y1',
                },
            ],
        };

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom" as const,
                    labels: { color: colors.muted, font: { size: 11, family: "inherit" } },
                },
                tooltip: {
                    backgroundColor: colors.card,
                    titleColor: colors.chart1,
                    bodyColor: colors.muted,
                    borderColor: colors.border,
                    borderWidth: 1,
                },
            },
            scales: {
                x: { grid: { display: false }, ticks: { color: colors.muted } },
                y: { grid: { color: colors.border }, ticks: { color: colors.muted } },
                y1: { grid: { drawOnChartArea: false }, ticks: { color: colors.muted } },
            },
        };

        return { chartData: data, options: chartOptions };
    }, [orders, colors, t]);

    return (
        <div className="w-full space-y-4 my-6" dir="ltr">
            <Card className="bg-card border-border shadow-sm">
                <CardHeader className="flex flex-col sm:flex-row items-start justify-between pb-4 border-b border-border/60">
                    <div className="space-y-1 text-left">
                        <CardTitle className="text-base font-semibold">{t('Customer Activity & Order Value Bridge')}</CardTitle>
                        <CardDescription className="text-muted-foreground text-xs">
                            {t("Real-time overview of recent customer orders, matching their current ticket size with total store history.")}
                        </CardDescription>
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
                <CardContent className="pt-6 h-[240px]">
                    <div className="w-full h-full">
                        {chartData.datasets.length > 0 && <Bar data={chartData} options={options} />}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default React.memo(MicroAnalyticsBridge);