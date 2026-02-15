import { NextResponse } from "next/server"
import { updateAppointmentStatus } from "@/lib/appointments"

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await _request.json().catch(() => ({}))
    const status = body.status

    if (status !== "pending" && status !== "approved") {
      return NextResponse.json(
        { error: "status must be 'pending' or 'approved'" },
        { status: 400 }
      )
    }

    const appointment = await updateAppointmentStatus(id, status)
    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
    }
    return NextResponse.json(appointment)
  } catch (error) {
    console.error("PATCH /api/appointments/[id]:", error)
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    )
  }
}
