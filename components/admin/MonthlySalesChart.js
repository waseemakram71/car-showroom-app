"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  carsSold: {
    label: "Cars Sold",
    color: "hsl(217, 91%, 60%)",
  },
}

export default function MonthlySalesChart({ data, title }) {
  if (!data?.length) {
    return (
      <div className="flex items-center justify-center h-full text-[#B8C3CA] text-sm">
        No data available yet
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col min-w-0">
      <h3 className="text-sm font-bold text-white mb-4 tracking-wide uppercase opacity-70 shrink-0">
        {title}
      </h3>
      <div className="overflow-x-auto overflow-y-hidden w-full flex-1">
        <div className="min-w-[600px] h-[260px]">
          <ChartContainer config={chartConfig} className="w-full h-full aspect-auto">
            <AreaChart
              data={data}
              margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#B8C3CA", fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
              />
              <YAxis
                tick={{ fill: "#B8C3CA", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator="dot"
                labelClassName="text-white font-semibold"
              />
            }
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
          />
          <Area
            type="monotone"
            dataKey="carsSold"
            stroke="#3B82F6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#barGradient)"
          />
        </AreaChart>
      </ChartContainer>
      </div>
      </div>
    </div>
  )
}
