"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartConfig = {
  contact: {
    label: "Contact",
    color: "hsl(217, 91%, 60%)",
  },
  serviceBooking: {
    label: "Service Booking",
    color: "hsl(38, 92%, 50%)",
  },
  carBuy: {
    label: "Car Purchase",
    color: "hsl(280, 67%, 60%)",
  },
}

export default function InquiryTrendsChart({ data, title }) {
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
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
        >
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
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="contact"
            stackId="inquiries"
            fill="#3B82F6"
            radius={[0, 0, 0, 0]}
            maxBarSize={32}
          />
          <Bar
            dataKey="serviceBooking"
            stackId="inquiries"
            fill="#F59E0B"
            radius={[0, 0, 0, 0]}
            maxBarSize={32}
          />
          <Bar
            dataKey="carBuy"
            stackId="inquiries"
            fill="#8B5CF6"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
