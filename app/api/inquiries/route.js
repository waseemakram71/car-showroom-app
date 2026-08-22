import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(inquiries)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    // Type can be 'contact', 'service-booking', 'car-buy'
    const { name, phone, email, subject, message, type, carModel, dateNeeded } = body

    if (!name || !phone || !type) {
      return NextResponse.json({ error: 'Name, phone, and type are required' }, { status: 400 })
    }

    const newInquiry = await prisma.inquiry.create({
      data: {
        name,
        phone,
        email: email || null,
        subject: subject || null,
        message: message || null,
        type,
        carModel: carModel || null,
        dateNeeded: dateNeeded || null,
      }
    })

    return NextResponse.json(newInquiry, { status: 201 })
  } catch (error) {
    console.error('Inquiry error:', error)
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 })
  }
}
