import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    if (!prisma.carPurchase) {
      return NextResponse.json({ error: 'CarPurchase model not available. Please run: npx prisma generate' }, { status: 503 })
    }
    const { id } = await params
    const purchase = await prisma.carPurchase.findUnique({
      where: { id },
    })

    if (!purchase) {
      return NextResponse.json({ error: 'Purchase not found' }, { status: 404 })
    }

    return NextResponse.json(purchase)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch purchase' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    if (!prisma.carPurchase) {
      return NextResponse.json({ error: 'CarPurchase model not available. Please run: npx prisma generate' }, { status: 503 })
    }
    const { id } = await params
    const body = await request.json()

    const updatedPurchase = await prisma.carPurchase.update({
      where: { id },
      data: {
        ...body,
        purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : undefined,
      },
    })

    return NextResponse.json(updatedPurchase)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update purchase' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!prisma.carPurchase) {
      return NextResponse.json({ error: 'CarPurchase model not available. Please run: npx prisma generate' }, { status: 503 })
    }
    const { id } = await params
    await prisma.carPurchase.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Purchase deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete purchase' }, { status: 500 })
  }
}
