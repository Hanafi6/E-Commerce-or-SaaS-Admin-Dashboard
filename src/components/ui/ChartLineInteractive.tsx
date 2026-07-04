"use client"

import * as React from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

interface Props {
    chartData: any[]
    chartConfig: ChartConfig
    title?: string
    description?: string
}

export function CustomeBarChart({
    chartData,
    chartConfig,
    title,
    description,
}: Props) {
    const dataKeys = Object.keys(chartConfig)

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="h-[250px] w-full"
                >
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                        />

                        <ChartTooltip
                            content={<ChartTooltipContent />}
                        />

                        {dataKeys.map((key) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                fill={`var(--color-${key})`}
                                radius={[8, 8, 0, 0]}
                            />
                        ))}

                        <ChartLegend content={<ChartLegendContent />} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}