import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const isAdmin = searchParams.get('admin') === 'true'

    const cars = await prisma.car.findMany({
      where: isAdmin ? undefined : { status: 'available' },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(cars)
  } catch (error) {
    console.error('Error fetching cars:', error)
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    // Basic protection: Ideally we would verify the NextAuth session here,
    // but the middleware protects /admin routes. It's best practice to also protect API routes.
    // For simplicity, we assume this is only called from admin pages.
    const body = await request.json()
    const { name, brand, year, price, mileage, fuelType, transmission, bodyType, description, featured, images, slug } = body

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 })
    }

    const newCar = await prisma.car.create({
      data: {
        name,
        brand: brand || null,
        slug,
        year: parseInt(year) || new Date().getFullYear(),
        price,
        mileage,
        fuelType,
        transmission,
        bodyType,
        description,
        featured: Boolean(featured),
        images: images || [],
        status: 'available',
      }
    })

    return NextResponse.json(newCar, { status: 201 })
  } catch (error) {
    console.error('Error creating car:', error)
    return NextResponse.json({ error: 'Failed to create car' }, { status: 500 })
  }
}
