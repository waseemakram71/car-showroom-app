"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(160, 84%, 39%)",
  },
}

function formatPKR(value) {
  if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`
  if (value >= 100000) return `${(value / 100000).toFixed(1)}L`
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
  return value.toString()
}

export default function SalesRevenueChart({ data, title }) {
  if (!data?.length) {
    return (
      <div className="flex items-center justify-center h-full text-[#B8C3CA] text-sm">
        No data available yet
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <h3 className="text-sm font-bold text-white mb-4 tracking-wide uppercase opacity-70">
        {title}
      </h3>
      <ChartContainer config={chartConfig} className="w-full h-[260px]">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: -4, bottom: 0 }}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.02} />
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
            tickFormatter={formatPKR}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator="dot"
                labelClassName="text-white font-semibold"
                formatter={(value, name) => (
                  <span className="font-mono tabular-nums text-foreground font-medium">
                    PKR {Number(value).toLocaleString()}
                  </span>
                )}
              />
            }
            cursor={{ stroke: "rgba(255,255,255,0.15)" }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#10B981"
            strokeWidth={2.5}
            fill="url(#areaGradient)"
            dot={false}
            activeDot={{ r: 5, fill: "#10B981", stroke: "#071D2B", strokeWidth: 2 }}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
