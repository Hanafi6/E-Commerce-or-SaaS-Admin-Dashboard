import { useMemo, useState } from "react";

import { useGetOrdersQuery } from "@/redux/services/orderSlice";

import { ChartConfig } from "@/components/ui/chart";
import { Order } from "@/types";
import PieCenter from "@/components/charts/pie-center";
import PieChart from "@/components/charts/pie-chart";
import PieSlice from "@/components/charts/pie-slice";
import {
    Legend,
    LegendItem,
    LegendLabel,
    LegendMarker,
    LegendValue,
} from "@/components/charts/legend";
import PieChartComponent from "@/components/PieChartComponent";

export type DailySales = Record<string, { date: string; total: number }>;
export type chartsData = { date: string; total: number };

export default function TestCharts() {
    const { data: orders = [] } = useGetOrdersQuery({ all: true });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const orderStatusPieData = useMemo(() => {
        const stats = {
            Paid: 0,
            Pending: 0,
            Failed: 0,
        }

        orders.forEach((order: Order) => {
            if (order.status === "Paid") {
                stats.Paid++
            } else if (order.status === "Pending") {
                stats.Pending++
            } else {
                stats.Failed++
            }
        })

        return [
            {
                name: "Paid",
                value: stats.Paid,
                color: "var(--chart-1)",
            },
            {
                name: "Pending",
                value: stats.Pending,
                color: "var(--chart-3)",
            },
            {
                name: "Failed",
                value: stats.Failed,
                color: "var(--chart-4)",
            },
        ]
    }, [orders])

    const legendItems = useMemo(
        () =>
            orderStatusPieData.map((item) => ({
                label: item.name,
                value: item.value,
                color: item.color,
            })),
        [orderStatusPieData]
    );


    const chartConfig = {
        Paid: { label: "Paid", color: "var(--chart-1)" },
        failed: { label: "failed", color: "var(--chart-2)" },
        Pending: { label: "Pending", color: "var(--chart-3)" },
    } satisfies ChartConfig;

    return (
        // <div className="flex items-center gap-8">
        //     <PieChart
        //         data={orderStatusPieData.map((item) => ({
        //             label: item.name,
        //             value: item.value,
        //             color: item.color,
        //         }))}
        //         hoveredIndex={hoveredIndex}
        //         innerRadius={55}
        //         onHoverChange={setHoveredIndex}
        //         size={180}
        //     >
        //         {orderStatusPieData.map((_, i) => (
        //             <PieSlice index={i} key={i} />
        //         ))}

        //         <PieCenter defaultLabel="Orders" />
        //     </PieChart>

        //     <Legend
        //         hoveredIndex={hoveredIndex}
        //         items={legendItems}
        //         onHoverChange={setHoveredIndex}
        //     >
        //         <LegendItem className="flex items-center justify-between gap-6">
        //             <div className="flex items-center gap-2">
        //                 <LegendMarker />
        //                 <LegendLabel />
        //             </div>

        //             <LegendValue />
        //         </LegendItem>
        //     </Legend>

        // </div>
        <PieChartComponent data={orders} Config={chartConfig} />
    );
}



