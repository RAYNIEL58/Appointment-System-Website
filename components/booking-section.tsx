"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarCheck, Loader2, Sparkles } from "lucide-react"

const services = ["ECG", "ULTRASOUND", "EYE CHECK UP", "2D ECHO"] as const

// Service → weekday (0 = Sunday, 1 = Monday, 2 = Tuesday, ... 6 = Saturday)
const serviceToWeekday: Record<(typeof services)[number], number> = {
  ULTRASOUND: 2, // Tuesday
  "EYE CHECK UP": 4, // Thursday
  "2D ECHO": 5, // Friday
  ECG: 6, // Saturday
}

const dayNamesUpper = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
function getServiceLabel(service: (typeof services)[number]): string {
  return `${service} (${dayNamesUpper[serviceToWeekday[service]]})`
}

// Services sorted by day of week (Tuesday → Thursday → Friday → Saturday)
const servicesByDay = [...services].sort(
  (a, b) => serviceToWeekday[a] - serviceToWeekday[b]
)

function getAvailableDates(weekday: number, count = 8): { value: string; label: string }[] {
  const out: { value: string; label: string }[] = []
  const today = new Date()
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const name = dayNames[weekday]
  let d = new Date(today)
  let daysAhead = (weekday - d.getDay() + 7) % 7
  d.setDate(d.getDate() + daysAhead)
  for (let i = 0; i < count; i++) {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    out.push({ value: `${y}-${m}-${day}`, label: `${name}, ${m}/${day}/${y}` })
    d.setDate(d.getDate() + 7)
  }
  return out
}

// Company service hours: 9:00 AM - 1:00 PM
const SERVICE_START_HOUR = 9
const SERVICE_END_HOUR = 13

// Procedure duration (mins) only — no allowance
const serviceSlotMinutes: Record<(typeof services)[number], number> = {
  ULTRASOUND: 5,    // 5 min
  "2D ECHO": 30,    // 30 min
  ECG: 5,           // 5 min
  "EYE CHECK UP": 15, // 15 min
}

function getTimeSlotsForService(service: (typeof services)[number]): string[] {
  const intervalMins = serviceSlotMinutes[service]
  const slots: string[] = []
  let mins = SERVICE_START_HOUR * 60
  const endMins = SERVICE_END_HOUR * 60
  while (mins + intervalMins <= endMins) {
    const h = Math.floor(mins / 60)
    const m = mins % 60
    const ampm = h >= 12 ? "PM" : "AM"
    const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h
    slots.push(`${h12}:${String(m).padStart(2, "0")} ${ampm}`)
    mins += intervalMins
  }
  return slots
}

export function BookingSection() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmationId, setConfirmationId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Something went wrong")
        setLoading(false)
        return
      }
      setConfirmationId(data.id)
      setSubmitted(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        preferredDate: "",
        preferredTime: "",
      })
    } catch {
      setError("Failed to book appointment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="book" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Book Now
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">Schedule Your Appointment</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Fill out the form below and our AI system will find the best available
            slot for you.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <Card className="border-border bg-card shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-card-foreground">
                <Sparkles className="h-5 w-5 text-primary" />
                AI-Assisted Booking
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {error && (
                    <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                      {error}
                    </p>
                  )}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Juan"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, firstName: e.target.value }))
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Dela Cruz"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="juan@email.com"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+63 912 345 6789"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="service">Service</Label>
                    <Select
                      required
                      value={formData.service}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          service: value,
                          preferredDate: "",
                          preferredTime: "",
                        }))
                      }
                    >
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {servicesByDay.map((s) => (
                          <SelectItem key={s} value={s}>
                            {getServiceLabel(s)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Select
                        required
                        value={formData.preferredDate}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            preferredDate: value,
                          }))
                        }
                        disabled={!formData.service}
                      >
                        <SelectTrigger id="date">
                          <SelectValue
                            placeholder={
                              formData.service
                                ? "Select a date"
                                : "Select a service first"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.service &&
                            getAvailableDates(
                              serviceToWeekday[formData.service as (typeof services)[number]]
                            ).map((d) => (
                              <SelectItem key={d.value} value={d.value}>
                                {d.label}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="time">Preferred Time (9 AM – 1 PM)</Label>
                      <Select
                        required
                        value={formData.preferredTime}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, preferredTime: value }))
                        }
                        disabled={!formData.service}
                      >
                        <SelectTrigger id="time">
                          <SelectValue
                            placeholder={
                              formData.service
                                ? "Select time"
                                : "Select a service first"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.service &&
                            getTimeSlotsForService(
                              formData.service as (typeof services)[number]
                            ).map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="mt-2 gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        <CalendarCheck className="h-5 w-5" />
                        Confirm Appointment
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CalendarCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Appointment Requested!
                  </h3>
                  {confirmationId && (
                    <p className="rounded-md bg-muted px-4 py-2 font-mono text-sm font-medium text-foreground">
                      Confirmation # {confirmationId.slice(0, 8).toUpperCase()}
                    </p>
                  )}
                  <p className="max-w-md text-muted-foreground">
                    Thank you for booking with Cudiamat Medical Corp. Our AI
                    system is processing your request. You will receive a
                    confirmation via email shortly. Save your confirmation number
                    for your records.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false)
                      setConfirmationId(null)
                    }}
                    className="mt-2"
                  >
                    Book Another Appointment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
