"use client"

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(160, 84%, 39%)",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(0, 84%, 60%)",
  },
}

function formatPKR(value) {
  if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`
  if (value >= 100000) return `${(value / 100000).toFixed(1)}L`
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
  return value.toString()
}

export default function RevenueExpenseChart({ data, title }) {
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
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 8, left: -4, bottom: 0 }}
        >
          <defs>
            <linearGradient id="revBarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#059669" stopOpacity={0.7} />
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
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="revenue"
            fill="url(#revBarGradient)"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#EF4444"
            strokeWidth={2.5}
            strokeDasharray="6 3"
            dot={{ r: 3, fill: "#EF4444", stroke: "#071D2B", strokeWidth: 2 }}
            activeDot={{ r: 5, fill: "#F87171", stroke: "#071D2B", strokeWidth: 2 }}
          />
        </ComposedChart>
      </ChartContainer>
    </div>
  )
}
