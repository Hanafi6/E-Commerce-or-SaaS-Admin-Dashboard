"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface IChartAreaInteractiveProps {
    chartData: any[],
    chartConfig: ChartConfig,
    title?: string,
    description?: string
}

export function ChartAreaInteractive({ chartData, chartConfig, title = "Analytics", description = "Overview" }: IChartAreaInteractiveProps) {
    const [timeRange, setTimeRange] = React.useState("90d")

    const filteredData = React.useMemo(() => {
        return chartData.filter((item) => {
            const date = new Date(item.date)
            const referenceDate = new Date()
            let daysToSubtract = 90
            if (timeRange === "30d") daysToSubtract = 30

            const startDate = new Date(referenceDate)
            startDate.setDate(startDate.getDate() - daysToSubtract)
            return date >= startDate
        })
    }, [chartData, timeRange])

    const dataKeys = Object.keys(chartConfig)

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[160px] rounded-lg">
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="90d">Last 3 months</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4">
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px]  w-full">
                    <AreaChart data={filteredData}>
                        <defs>
                            {dataKeys.map((key) => (
                                <linearGradient key={key} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={`${chartConfig[key].color}`} stopOpacity={0.8} />
                                    <stop offset="20%" stopColor={`${chartConfig[key].color}`} stopOpacity={0.7} />
                                    <stop offset="40%" stopColor={`${chartConfig[key].color}`} stopOpacity={0.4} />
                                    <stop offset="80%" stopColor={`${chartConfig[key].color}`} stopOpacity={0.2} />
                                    <stop offset="95%" stopColor={`${chartConfig[key].color}`} stopOpacity={0.1} />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        />
                        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />

                        {dataKeys.map((key) => (
                            <Area
                                key={key}
                                dataKey={key}
                                type="natural"
                                fill={`url(#fill${key})`}
                                stroke={`var(--color-${key})`}
                                stackId="a"
                            />
                        ))}
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>

                </ChartContainer>
            </CardContent>
        </Card>
    )
}

