import { MessageCircle, CalendarSearch, FileText, CheckCircle2 } from "lucide-react"

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Choose Your Booking Method",
    description:
      "Option 1: Chat with our AI assistant - describe your symptoms and get service recommendations. Option 2: Use the form below - manually select your service and preferred schedule.",
  },
  {
    icon: CalendarSearch,
    step: "02",
    title: "Select Service & Schedule",
    description:
      "Choose from ECG (Saturday), ULTRASOUND (Tuesday), EYE CHECK UP (Thursday), or 2D ECHO (Friday). Pick your preferred date and time based on the service's available days (9 AM - 1 PM).",
  },
  {
    icon: FileText,
    step: "03",
    title: "Provide Your Details",
    description:
      "Fill in your first name, last name, email, and phone number. The AI assistant can guide you through this, or you can fill the form directly.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Confirm & Visit",
    description:
      "Receive instant confirmation with your appointment ID. Visit us on your scheduled day between 9 AM - 1 PM.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold uppercase tracking-wider text-primary">
            How It Works
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            <span className="text-balance">Book Your Appointment in 4 Easy Steps</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Choose your preferred booking method: Use our AI assistant for guided recommendations, or fill out the form below to book manually. Both options are quick and easy.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block" />

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-y-16">
            {steps.map((step, i) => (
              <div
                key={step.step}
                className={`relative flex gap-4 ${
                  i % 2 === 1 ? "lg:col-start-2" : "lg:col-start-1"
                }`}
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                  <step.icon className="h-7 w-7" />
                </div>
                <div>
                  <span className="font-display text-sm font-bold uppercase tracking-widest text-primary">
                    Step {step.step}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
