import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const car = await prisma.car.findUnique({
      where: { id }
    })
    
    if (!car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 })
    }
    
    return NextResponse.json(car)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch car' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const updatedCar = await prisma.car.update({
      where: { id },
      data: {
        ...body,
        year: body.year ? parseInt(body.year) : undefined,
      }
    })
    
    return NextResponse.json(updatedCar)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update car' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    // Soft delete: set status to 'sold'
    const updatedCar = await prisma.car.update({
      where: { id },
      data: { status: 'sold' }
    })
    
    return NextResponse.json({ message: 'Car marked as sold', car: updatedCar })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete/mark sold' }, { status: 500 })
  }
}
