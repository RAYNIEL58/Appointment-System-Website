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
import {
  CalendarCheck,
  Loader2,
  MessageCircle,
  Send,
  Sparkles,
  X as CloseIcon,
} from "lucide-react"

const services = ["ECG", "ULTRASOUND", "EYE CHECK UP", "2D ECHO"] as const
type Service = (typeof services)[number]

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

async function getFirstAvailableSlot(service: Service) {
  const weekday = serviceToWeekday[service]
  const dates = getAvailableDates(weekday, 4)
  if (dates.length === 0) return null
  const date = dates[0].value

  const times = getTimeSlotsForService(service)
  if (times.length === 0) return { date, time: "" }
  const time = times[0]

  // For now we don't check existing bookings; first slot is \"next available\"
  return { date, time }
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

  type ChatMessage = { from: "user" | "ai"; text: string }
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)

  type ChatStep = "idle" | "askName" | "askEmail" | "askPhone"
  const [chatStep, setChatStep] = useState<ChatStep>("idle")

  async function handleChatSend(e?: React.FormEvent) {
    if (e) e.preventDefault()
    const text = chatInput.trim()
    if (!text) return
    setChatMessages((prev) => [...prev, { from: "user", text }])
    setChatInput("")
    setChatLoading(true)

    // If we are in a \"collect details\" step, handle locally without calling AI
    if (chatStep === "askName") {
      const parts = text.split(" ")
      const firstName = parts[0] ?? ""
      const lastName = parts.slice(1).join(" ")
      setFormData((prev) => ({
        ...prev,
        firstName: firstName || prev.firstName,
        lastName: lastName || prev.lastName,
      }))
      setChatMessages((prev) => [
        ...prev,
        { from: "ai", text: "Thanks! What is your email address?" },
      ])
      setChatStep("askEmail")
      setChatLoading(false)
      return
    }

    if (chatStep === "askEmail") {
      setFormData((prev) => ({
        ...prev,
        email: text || prev.email,
      }))
      setChatMessages((prev) => [
        ...prev,
        { from: "ai", text: "Got it. Lastly, what is your phone number?" },
      ])
      setChatStep("askPhone")
      setChatLoading(false)
      return
    }

    if (chatStep === "askPhone") {
      setFormData((prev) => ({
        ...prev,
        phone: text || prev.phone,
      }))
      setChatMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text:
            "Thank you. I now have your details. You can tap “Book this appointment” to confirm your schedule.",
        },
      ])
      setChatStep("idle")
      setChatLoading(false)
      return
    }

    // Normal AI flow
    try {
      const res = await fetch("/api/ai-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()

      if (!res.ok || data.error) {
        const msg =
          data?.reply ??
          data?.error ??
          "Sorry, the AI assistant is not available right now. Please try again later."
        setChatMessages((prev) => [...prev, { from: "ai", text: msg }])
        return
      }

      // Always show AI reply
      setChatMessages((prev) => [...prev, { from: "ai", text: data.reply ?? "" }])

      // If AI suggested a service, also pick date/time locally
      if (data.service && (services as readonly string[]).includes(data.service)) {
        const svc = data.service as Service
        const slot = await getFirstAvailableSlot(svc)

        setFormData((prev) => ({
          ...prev,
          service: svc,
          preferredDate: slot?.date ?? prev.preferredDate,
          preferredTime: slot?.time ?? prev.preferredTime,
        }))

        setChatMessages((prev) => [
          ...prev,
          {
            from: "ai",
            text: `I can book ${svc} on ${slot?.date ?? "the next available day"} at ${
              slot?.time ?? ""
            }. If your details below are correct, tap “Book this appointment”.`,
          },
        ])

        // If details are missing, start asking for them in chat
        if (
          !formData.firstName ||
          !formData.lastName ||
          !formData.email ||
          !formData.phone
        ) {
          setChatMessages((prev) => [
            ...prev,
            {
              from: "ai",
              text:
                "To finish booking, let me collect your details. What is your full name?",
            },
          ])
          setChatStep("askName")
        }
      }
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: "Sorry, something went wrong talking to the AI assistant. Please try again.",
        },
      ])
    } finally {
      setChatLoading(false)
    }
  }

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

  const canQuickBook =
    !!formData.firstName &&
    !!formData.lastName &&
    !!formData.email &&
    !!formData.phone &&
    !!formData.service &&
    !!formData.preferredDate &&
    !!formData.preferredTime

  async function handleChatBook() {
    if (!canQuickBook) {
      setChatMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text:
            "I need your name, email, phone, service, date, and time before I can book an appointment.",
        },
      ])
      return
    }

    setChatLoading(true)
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setChatMessages((prev) => [
          ...prev,
          { from: "ai", text: data.error ?? "Failed to create appointment." },
        ])
        return
      }

      setChatMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: `Your appointment has been booked!\n\nConfirmation: ${data.id
            ?.slice(0, 8)
            ?.toUpperCase()}`,
        },
      ])
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { from: "ai", text: "Sorry, something went wrong while booking. Please try again." },
      ])
    } finally {
      setChatLoading(false)
    }
  }

  return (
    <section id="book" className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold uppercase tracking-wider text-primary">
            Book Now
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            <span className="text-balance">Schedule Your Appointment</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Fill out the form below to book your appointment manually, or use the AI assistant chat bubble for guided booking. Both methods are available.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <Card className="border-border bg-card shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-display text-xl text-card-foreground">
                <Sparkles className="h-6 w-6 text-primary" />
                AI-Assisted Booking
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {error && (
                    <p className="rounded-md bg-destructive/10 px-4 py-3 text-base text-destructive">
                      {error}
                    </p>
                  )}
                  <div className="grid gap-6 sm:grid-cols-2">
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

                  <div className="grid gap-6 sm:grid-cols-2">
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
                    className="mt-4 gap-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        <CalendarCheck className="h-6 w-6" />
                        Confirm Appointment
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="flex flex-col items-center gap-5 py-10 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <CalendarCheck className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Appointment Requested!
                  </h3>
                  {confirmationId && (
                    <p className="rounded-md bg-muted px-5 py-3 font-mono text-lg font-semibold text-foreground">
                      Confirmation # {confirmationId.slice(0, 8).toUpperCase()}
                    </p>
                  )}
                  <p className="max-w-md text-lg text-muted-foreground">
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
                    className="mt-4"
                  >
                    Book Another Appointment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI assistant bubble */}
      <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {chatOpen && (
          <div className="pointer-events-auto w-96 rounded-2xl border-2 border-border bg-card/95 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between border-b-2 px-5 py-3">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-base font-semibold text-card-foreground">
                  AI Booking Assistant
                </span>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted"
                aria-label="Close chat"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex max-h-80 flex-col gap-3 overflow-y-auto px-5 py-4">
              {chatMessages.length === 0 && (
                <p className="text-base text-muted-foreground">
                  Tell me your concern (e.g. chest pain, blurry vision) and I&apos;ll suggest the
                  best service and schedule for you.
                </p>
              )}
              {chatMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    m.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      m.from === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    } max-w-[85%] whitespace-pre-wrap text-base`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            {canQuickBook && (
              <div className="flex justify-center px-4 pb-3">
                <Button
                  type="button"
                  size="default"
                  onClick={handleChatBook}
                  disabled={chatLoading}
                  className="rounded-full px-6"
                >
                  Book this appointment
                </Button>
              </div>
            )}
            <form
              onSubmit={handleChatSend}
              className="flex items-center gap-3 border-t-2 bg-background/60 px-4 py-3"
            >
              <Input
                type="text"
                placeholder="Ask about your concern..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="h-12 text-base"
              />
              <Button
                type="submit"
                size="icon"
                disabled={chatLoading}
                className="h-12 w-12"
              >
                {chatLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </form>
          </div>
        )}
        <button
          type="button"
          onClick={() => setChatOpen((open) => !open)}
          className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl ring-2 ring-primary/40 hover:bg-primary/90"
          aria-label="Open AI booking assistant"
        >
          <MessageCircle className="h-8 w-8" />
        </button>
      </div>
    </section>
  )
}
