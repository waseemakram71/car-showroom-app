import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    if (!prisma.employee) {
      return NextResponse.json({ error: 'Employee model not available. Please run: npx prisma generate' }, { status: 503 })
    }
    const { id } = await params
    const employee = await prisma.employee.findUnique({
      where: { id },
    })

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
    }

    return NextResponse.json(employee)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch employee' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    if (!prisma.employee) {
      return NextResponse.json({ error: 'Employee model not available. Please run: npx prisma generate' }, { status: 503 })
    }
    const { id } = await params
    const body = await request.json()

    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: {
        ...body,
        salary: body.salary !== undefined ? parseInt(body.salary) : undefined,
        joiningDate: body.joiningDate ? new Date(body.joiningDate) : undefined,
        image: body.image !== undefined ? body.image : undefined,
      },
    })

    return NextResponse.json(updatedEmployee)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update employee' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!prisma.employee) {
      return NextResponse.json({ error: 'Employee model not available. Please run: npx prisma generate' }, { status: 503 })
    }
    const { id } = await params
    await prisma.employee.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Employee deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete employee' }, { status: 500 })
  }
}
