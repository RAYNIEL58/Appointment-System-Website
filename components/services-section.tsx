import {
  HeartPulse,
  Eye,
  Activity,
  Radio,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: Radio,
    title: "ULTRASOUND",
    day: "Tuesday",
    description:
      "Non-invasive imaging procedure using sound waves to visualize internal organs and structures. Quick 5-minute sessions available.",
  },
  {
    icon: Eye,
    title: "EYE CHECK UP",
    day: "Thursday",
    description:
      "Comprehensive eye examination to assess vision health, detect eye conditions, and ensure optimal eye care. 15-minute appointments.",
  },
  {
    icon: Activity,
    title: "2D ECHO",
    day: "Friday",
    description:
      "Two-dimensional echocardiography for detailed heart imaging and cardiac assessment. 30-minute comprehensive cardiac evaluation.",
  },
  {
    icon: HeartPulse,
    title: "ECG",
    day: "Saturday",
    description:
      "Electrocardiogram test to monitor heart rhythm and detect cardiac abnormalities. Quick 5-minute heart health check.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="bg-muted/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold uppercase tracking-wider text-primary">
            Our Services
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            <span className="text-balance">Available Medical Services</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Book your appointment for any of our specialized diagnostic services.
            Each service is available on specific days with convenient scheduling.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group border-2 border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="h-8 w-8" />
                </div>
                <div className="flex items-center gap-2">
                  <CardTitle className="font-display text-xl text-card-foreground">{service.title}</CardTitle>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {service.day}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
