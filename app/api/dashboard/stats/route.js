import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET /api/dashboard/stats
 * Returns aggregated analytics data for the admin dashboard charts.
 * - Monthly car sales counts
 * - Monthly revenue (from sold car prices)
 * - Inquiry trends by type
 * - Simulated expense data (until a real Expense model is added)
 */
export async function GET() {
  try {
    const now = new Date()
    const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1)

    // Fetch sold cars with createdAt within the last 12 months
    const soldCars = await prisma.car.findMany({
      where: {
        status: 'sold',
        createdAt: { gte: twelveMonthsAgo },
      },
      select: { price: true, createdAt: true },
    })

    // Fetch inquiries within the last 12 months
    const inquiries = await prisma.inquiry.findMany({
      where: {
        createdAt: { gte: twelveMonthsAgo },
      },
      select: { type: true, createdAt: true },
    })

    // Build month labels for the last 12 months
    const months = []
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      months.push({
        key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
        label: d.toLocaleString('en-US', { month: 'short' }),
        year: d.getFullYear(),
        month: d.getMonth(),
      })
    }

    // Parse price string to number (handles formats like "PKR 3,500,000" or "3500000")
    function parsePrice(priceStr) {
      if (!priceStr) return 0
      const cleaned = priceStr.replace(/[^0-9.]/g, '')
      return parseFloat(cleaned) || 0
    }

    // Aggregate sold cars by month
    const monthlySales = months.map((m) => {
      const monthCars = soldCars.filter((c) => {
        const d = new Date(c.createdAt)
        return d.getFullYear() === m.year && d.getMonth() === m.month
      })
      const revenue = monthCars.reduce((sum, c) => sum + parsePrice(c.price), 0)
      return {
        month: m.label,
        fullKey: m.key,
        carsSold: monthCars.length,
        revenue: Math.round(revenue),
      }
    })

    // Simulated expenses (realistic for a car dealership — rent, salaries, parts, utilities)
    // These can be replaced with real data once an Expense model is added
    const baseExpense = 800000 // ~PKR 800k base monthly expenses
    const monthlyExpenses = monthlySales.map((m, i) => {
      // Add some realistic variance
      const variance = Math.sin(i * 0.8) * 150000 + Math.random() * 100000
      return {
        ...m,
        expenses: Math.round(baseExpense + variance),
      }
    })

    // Aggregate inquiries by month and type
    const inquiryTrends = months.map((m) => {
      const monthInquiries = inquiries.filter((inq) => {
        const d = new Date(inq.createdAt)
        return d.getFullYear() === m.year && d.getMonth() === m.month
      })
      return {
        month: m.label,
        contact: monthInquiries.filter((inq) => inq.type === 'contact').length,
        serviceBooking: monthInquiries.filter((inq) => inq.type === 'service-booking').length,
        carBuy: monthInquiries.filter((inq) => inq.type === 'car-buy').length,
        total: monthInquiries.length,
      }
    })

    // Summary totals
    const totalSold = soldCars.length
    const totalRevenue = soldCars.reduce((sum, c) => sum + parsePrice(c.price), 0)
    const totalInquiries = inquiries.length

    return NextResponse.json({
      monthlySales,
      monthlyExpenses,
      inquiryTrends,
      summary: {
        totalSold,
        totalRevenue: Math.round(totalRevenue),
        totalInquiries,
      },
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
