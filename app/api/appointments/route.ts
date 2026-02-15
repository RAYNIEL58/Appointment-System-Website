import { NextResponse } from "next/server"
import { getAppointments, createAppointment } from "@/lib/appointments"

export async function GET() {
  try {
    const appointments = await getAppointments()
    return NextResponse.json(appointments)
  } catch (error) {
    console.error("GET /api/appointments:", error)
    return NextResponse.json(
      { error: "Failed to load appointments" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      service,
      preferredDate,
      preferredTime,
    } = body

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !service ||
      !preferredDate ||
      !preferredTime
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const appointment = await createAppointment({
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      service: String(service).trim(),
      preferredDate: String(preferredDate).trim(),
      preferredTime: String(preferredTime).trim(),
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error("POST /api/appointments:", error)
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    )
  }
}
