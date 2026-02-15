import { MapPin, Phone, Mail, Clock } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "Hari Clinic, Cudiamat Medical Corp.",
    sub: "Philippines",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+63 (02) 1234-5678",
    sub: "Mon-Sat, 8AM-5PM",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@cudiamatmedical.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: Clock,
    label: "Clinic Hours",
    value: "Mon - Sat: 8:00 AM - 5:00 PM",
    sub: "Sunday: Closed",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="bg-muted/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Get In Touch
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">Contact Us</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Have questions or need assistance? Reach out to us and our team will
            be happy to help.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-all hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </p>
              <p className="text-sm font-semibold text-foreground">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
