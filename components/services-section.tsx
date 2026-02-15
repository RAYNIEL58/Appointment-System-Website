import {
  Activity,
  Brain,
  HeartPulse,
  Stethoscope,
  Bone,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: Bone,
    title: "Physical Therapy",
    description:
      "Rehabilitation programs tailored to your specific needs, helping you recover mobility and strength.",
  },
  {
    icon: Stethoscope,
    title: "General Consultation",
    description:
      "Comprehensive medical consultations with experienced physicians for all your health concerns.",
  },
  {
    icon: HeartPulse,
    title: "Cardiac Rehabilitation",
    description:
      "Specialized recovery programs for patients with heart conditions, monitored by our expert team.",
  },
  {
    icon: Brain,
    title: "Neurological Therapy",
    description:
      "Advanced neuro-rehabilitation techniques for stroke recovery and neurological conditions.",
  },
  {
    icon: Activity,
    title: "Sports Medicine",
    description:
      "Injury prevention, treatment, and performance optimization for athletes of all levels.",
  },
  {
    icon: Zap,
    title: "Pain Management",
    description:
      "Holistic approaches to chronic pain relief using modern therapeutic modalities and techniques.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="bg-muted/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Our Services
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">Comprehensive Healthcare Solutions</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            From physical therapy to specialized treatments, we provide a full
            spectrum of healthcare services tailored to your needs.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="font-display text-lg text-card-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
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
