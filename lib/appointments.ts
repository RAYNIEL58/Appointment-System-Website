import { readFile, writeFile, mkdir } from "fs/promises"
import path from "path"

export type Appointment = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  service: string
  preferredDate: string
  preferredTime: string
  createdAt: string
  status?: "pending" | "approved"
}

export type CreateAppointmentBody = Omit<Appointment, "id" | "createdAt">

const getDataPath = () =>
  path.join(process.cwd(), "data", "appointments.json")

export async function getAppointments(): Promise<Appointment[]> {
  try {
    const filePath = getDataPath()
    const data = await readFile(filePath, "utf-8")
    return JSON.parse(data) as Appointment[]
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return []
    }
    throw err
  }
}

export async function createAppointment(
  body: CreateAppointmentBody
): Promise<Appointment> {
  const appointments = await getAppointments()
  const appointment: Appointment = {
    ...body,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending",
  }
  appointments.push(appointment)

  const dataDir = path.join(process.cwd(), "data")
  await mkdir(dataDir, { recursive: true })
  await writeFile(getDataPath(), JSON.stringify(appointments, null, 2), "utf-8")

  return appointment
}

export async function updateAppointmentStatus(
  id: string,
  status: "pending" | "approved"
): Promise<Appointment | null> {
  const appointments = await getAppointments()
  const index = appointments.findIndex((a) => a.id === id)
  if (index === -1) return null
  appointments[index] = { ...appointments[index], status }
  await writeFile(getDataPath(), JSON.stringify(appointments, null, 2), "utf-8")
  return appointments[index]
}
