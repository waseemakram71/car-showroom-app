import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    if (!prisma.carPurchase) {
      return NextResponse.json({ error: 'CarPurchase model not available. Please run: npx prisma generate' }, { status: 503 })
    }
    const purchases = await prisma.carPurchase.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(purchases)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch car purchases' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    if (!prisma.carPurchase) {
      return NextResponse.json({ error: 'CarPurchase model not available. Please run: npx prisma generate' }, { status: 503 })
    }
    const body = await request.json()
    const { carModel, company, purchasePrice, purchaseDate, purchasedFrom, notes } = body

    if (!carModel || !company || !purchasePrice || !purchaseDate || !purchasedFrom) {
      return NextResponse.json(
        { error: 'All fields except notes are required' },
        { status: 400 }
      )
    }

    const purchase = await prisma.carPurchase.create({
      data: {
        carModel,
        company,
        purchasePrice,
        purchaseDate: new Date(purchaseDate),
        purchasedFrom,
        notes: notes || null,
      },
    })

    return NextResponse.json(purchase, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add car purchase' }, { status: 500 })
  }
}
