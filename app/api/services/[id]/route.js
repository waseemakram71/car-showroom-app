import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const service = await prisma.service.findUnique({
      where: { id }
    })
    
    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    
    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const updatedService = await prisma.service.update({
      where: { id },
      data: body
    })
    
    return NextResponse.json(updatedService)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    await prisma.service.delete({
      where: { id }
    })
    
    return NextResponse.json({ message: 'Service deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}
