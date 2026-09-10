"use client"

import { useState, useEffect } from "react"
import MonthlySalesChart from "./MonthlySalesChart"
import SalesRevenueChart from "./SalesRevenueChart"
import CarsSoldChart from "./CarsSoldChart"
import RevenueExpenseChart from "./RevenueExpenseChart"
import InquiryTrendsChart from "./InquiryTrendsChart"

function ChartCard({ children }) {
  return (
    <div
      className="rounded-2xl p-5 border border-white/10 shadow-lg transition-all duration-300 hover:border-white/20 hover:shadow-xl"
      style={{
        background: "linear-gradient(145deg, #071D2B 0%, #0D324A 100%)",
        minHeight: "340px",
      }}
    >
      {children}
    </div>
  )
}

function ChartSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-3 w-28 bg-white/10 rounded mb-6" />
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-end gap-2" style={{ height: `${20 + Math.random() * 30}px` }}>
            <div className="h-full w-full bg-white/5 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DashboardCharts({ translations }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard/stats")
        if (!res.ok) throw new Error("Failed to fetch stats")
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error("Dashboard stats error:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (error) {
    return (
      <div className="rounded-2xl p-8 border border-red-500/20 text-center"
        style={{ background: "linear-gradient(145deg, #071D2B 0%, #0D324A 100%)" }}
      >
        <p className="text-red-400 text-sm font-medium">
          Failed to load analytics data. Please try refreshing.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      {/* Summary strip */}
      {!loading && data?.summary && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            {
              label: translations.totalCarsSold || "Total Cars Sold",
              value: data.summary.totalSold,
              color: "#8B5CF6",
            },
            {
              label: translations.totalRevenue || "Total Revenue",
              value: `PKR ${data.summary.totalRevenue.toLocaleString()}`,
              color: "#10B981",
            },
            {
              label: translations.totalInquiries || "Total Inquiries",
              value: data.summary.totalInquiries,
              color: "#3B82F6",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl px-5 py-4 border border-white/10"
              style={{ background: "linear-gradient(145deg, #071D2B 0%, #0D324A 100%)" }}
            >
              <p className="text-xs font-medium uppercase tracking-wider text-[#B8C3CA] mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-black text-white" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Monthly Sales Chart only */}
      <div className="grid gap-6 md:grid-cols-1">
        <ChartCard>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <MonthlySalesChart
              data={data?.monthlySales}
              title={translations.monthlySales || "Monthly Sales"}
            />
          )}
        </ChartCard>
      </div>
    </div>
  )
}
