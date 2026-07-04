import { useMemo, useState } from "react"
import { ChartConfig } from "./ui/chart";

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


interface IPropsPieChartComp<TData> {
    data: TData[],

    Config?: ChartConfig
}

function PieChartComponent<TData>({ data, Config }: IPropsPieChartComp<TData>) {

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const orderStatusPieData = useMemo(() => {
        const stats = {
            Paid: 0,
            Pending: 0,
            Failed: 0,
        }

        data.forEach((order: any) => {
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
    }, [data]);


    // to Legend Content
    const legendItems = useMemo(
        () =>
            orderStatusPieData.map((item) => ({
                label: item.name,
                value: item.value,
                color: item.color,
            })),
        [orderStatusPieData]
    );

    return (
        <div className="flex items-center gap-8">
            <PieChart
                data={orderStatusPieData.map((item) => ({
                    label: item.name,
                    value: item.value,
                    color: item.color,
                }))}
                hoveredIndex={hoveredIndex}
                innerRadius={55}
                onHoverChange={setHoveredIndex}
                size={180}
            >
                {orderStatusPieData.map((_, i) => (
                    <PieSlice index={i} key={i} />
                ))}

                <PieCenter defaultLabel="Orders" />
            </PieChart>

            <Legend
                hoveredIndex={hoveredIndex}
                items={legendItems}
                onHoverChange={setHoveredIndex}
            >
                <LegendItem className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <LegendMarker />
                        <LegendLabel />
                    </div>

                    <LegendValue />
                </LegendItem>
            </Legend>


        </div>
    )
}

export default PieChartComponent