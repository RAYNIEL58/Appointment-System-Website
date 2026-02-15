import { UserPlus, CalendarSearch, BellRing, CheckCircle2 } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Account",
    description:
      "Sign up in seconds and provide your basic health information to get started.",
  },
  {
    icon: CalendarSearch,
    step: "02",
    title: "Choose a Service",
    description:
      "Browse available services and select the treatment or consultation you need.",
  },
  {
    icon: BellRing,
    step: "03",
    title: "Pick Your Schedule",
    description:
      "Our AI suggests the best available time slots based on your preferences and doctor availability.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Confirm & Visit",
    description:
      "Receive instant confirmation and reminders. Just show up at your scheduled time.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            How It Works
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">Book Your Appointment in 4 Easy Steps</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our AI-powered system makes scheduling effortless so you can focus on
            what matters most — your health.
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
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                  <step.icon className="h-6 w-6" />
                </div>
                <div>
                  <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
                    Step {step.step}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
