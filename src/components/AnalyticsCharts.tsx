import React, { useMemo, useEffect, useState } from "react";
import { Order } from "@/types";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip as ChartTooltip,
    Legend as ChartLegend,
    ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    ChartTooltip,
    ChartLegend
);

interface AnalyticsChartsProps {
    orders: Order[];
}

function AnalyticsCharts({ orders }: AnalyticsChartsProps) {
    const [colors, setColors] = useState<Record<string, string>>({});
    const { t } = useTranslation();

    // 💡 الخدعة: مصفوفة وهمية عشان الـ Parser يلم كل الكلمات اللي جوه الـ Charts
    useMemo(() => [
        t("Revenue Overview"),
        t("Daily revenue generated from Paid orders."),
        t("Order Status Breakdown"),
        t("Current distribution of all shop orders."),
        t("Revenue ($)"),
        t("Paid"),
        t("Pending"),
        t("Failed")
    ], [t]);

    useEffect(() => {
        const updateChartColors = () => {
            let style = getComputedStyle(document.documentElement);
            setColors({
                chart1: style.getPropertyValue("--chart-1").trim(),
                chart3: style.getPropertyValue("--chart-3").trim(),
                chart5: style.getPropertyValue("--chart-5").trim(),
                muted: style.getPropertyValue("--muted-foreground").trim(),
                border: style.getPropertyValue("--border").trim(),
                card: style.getPropertyValue("--card").trim(),
                primary: style.getPropertyValue("--primary").trim(),
            });
        };

        updateChartColors();
        window.addEventListener("theme-changed", updateChartColors);
        window.addEventListener("storage", updateChartColors);

        return () => {
            window.removeEventListener("theme-changed", updateChartColors);
            window.removeEventListener("storage", updateChartColors);
        };
    }, []);

    const lineChartData = useMemo(() => {
        const salesMap: Record<string, number> = {};
        orders.forEach((order) => {
            const dateLabel = order.time
                ? new Date(order.time).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                : "Unknown";
            const orderAmount = order.status === "Paid" ? Number(order.totalPrice) || 0 : 0;
            salesMap[dateLabel] = (salesMap[dateLabel] || 0) + orderAmount;
        });

        const last7Days = Object.keys(salesMap).slice(-7);

        return {
            labels: last7Days,
            datasets: [
                {
                    label: t("Revenue ($)"),
                    data: last7Days.map((date) => salesMap[date]),
                    borderColor: colors.chart1,
                    borderWidth: 2.5,
                    tension: 0.3,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: colors.card,
                    pointBorderColor: colors.chart1,
                },
            ],
        };
    }, [orders, colors, t]);

    const pieChartData = useMemo(() => {
        const statusMap: Record<string, number> = { Paid: 0, Pending: 0, Failed: 0 };
        orders.forEach((order) => {
            const status = order.status || "Unknown";
            if (statusMap[status] !== undefined) statusMap[status] += 1;
        });

        return {
            labels: Object.keys(statusMap).map(status => t(status)), // ترجمة الـ Labels
            datasets: [
                {
                    data: Object.values(statusMap),
                    backgroundColor: [colors.chart1, colors.chart3, colors.chart5],
                    borderWidth: 2,
                    borderColor: colors.card,
                },
            ],
        };
    }, [orders, colors, t]);

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: colors.card,
                titleColor: colors.primary,
                bodyColor: colors.muted,
                borderColor: colors.border,
                borderWidth: 1,
                cornerRadius: 8,
                font: { family: "inherit" }
            }
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: colors.muted, font: { size: 10, family: "inherit" } } },
            y: { grid: { color: colors.border }, border: { display: false }, ticks: { color: colors.muted, font: { size: 10, family: "inherit" } } },
        },
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom" as const,
                labels: {
                    boxWidth: 8,
                    boxHeight: 8,
                    usePointStyle: true,
                    pointStyle: "circle",
                    color: colors.muted,
                    font: { size: 11, family: "inherit" },
                },
            },
            tooltip: {
                backgroundColor: colors.card,
                titleColor: colors.primary,
                bodyColor: colors.muted,
                borderColor: colors.border,
                borderWidth: 1,
                cornerRadius: 8,
                font: { family: "inherit" }
            }
        },
        cutout: "65%",
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full" dir="ltr">
            <div className="lg:col-span-2 p-5 bg-card border border-border rounded-2xl flex flex-col gap-4 text-left shadow-sm">
                <div>
                    <h4 className="text-sm font-bold text-foreground m-0">{t("Revenue Overview")}</h4>
                    <p className="text-[11px] text-muted-foreground">{t("Daily revenue generated from Paid orders.")}</p>
                </div>
                <div className="h-64 w-full">
                    {colors.chart1 && <Line data={lineChartData} options={lineOptions} />}
                </div>
            </div>

            <div className="p-5 bg-card border border-border rounded-2xl flex flex-col gap-4 text-left shadow-sm">
                <div>
                    <h4 className="text-sm font-bold text-foreground m-0">{t('Order Status Breakdown')}</h4>
                    <p className="text-[11px] text-muted-foreground">{t("Current distribution of all shop orders.")}</p>
                </div>
                <div className="h-64 w-full flex items-center justify-center">
                    {colors.chart1 && <Pie data={pieChartData} options={pieOptions} />}
                </div>
            </div>
        </div>
    );
}

export default React.memo(AnalyticsCharts);