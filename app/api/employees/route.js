import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Check if the employee model exists on the prisma client
    if (!prisma.employee) {
      return NextResponse.json([])
    }
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(employees)
  } catch (error) {
    console.error('Error fetching employees:', error)
    // Return empty array if the collection doesn't exist yet
    return NextResponse.json([])
  }
}

export async function POST(request) {
  try {
    if (!prisma.employee) {
      return NextResponse.json(
        { error: 'Employee model not available. Please run: npx prisma generate' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { name, phone, role, salary, joiningDate, status, image } = body

    if (!name || !phone || !role || salary === undefined) {
      return NextResponse.json(
        { error: 'Name, phone, role, and salary are required' },
        { status: 400 }
      )
    }

    const employee = await prisma.employee.create({
      data: {
        name,
        phone,
        role,
        salary: parseInt(salary),
        joiningDate: new Date(joiningDate || Date.now()),
        status: status || 'active',
        image: image || null,
      },
    })

    return NextResponse.json(employee, { status: 201 })
  } catch (error) {
    console.error('Error creating employee:', error)
    return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 })
  }
}
