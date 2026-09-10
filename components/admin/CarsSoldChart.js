"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  carsSold: {
    label: "Cars Sold",
    color: "hsl(280, 67%, 60%)",
  },
}

export default function CarsSoldChart({ data, title }) {
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
        <LineChart
          data={data}
          margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1} />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity={1} />
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
            cursor={{ stroke: "rgba(255,255,255,0.15)" }}
          />
          <Line
            type="monotone"
            dataKey="carsSold"
            stroke="url(#lineGradient)"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#8B5CF6", stroke: "#071D2B", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "#A78BFA", stroke: "#071D2B", strokeWidth: 2 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}
