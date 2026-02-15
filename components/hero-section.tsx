import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarCheck, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>AI-Powered Scheduling</span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">Your Health, Our Priority.</span>
            <br />
            <span className="text-primary">Book Smarter.</span>
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            Experience seamless appointment scheduling powered by AI at Cudiamat
            Medical Corp. — your number 1 partner in physical therapy and health.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="#book">
                <CalendarCheck className="h-5 w-5" />
                Book an Appointment
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#services">Explore Services</Link>
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div>
              <p className="font-display text-2xl font-bold text-foreground">5,000+</p>
              <p className="text-sm text-muted-foreground">Patients Served</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="font-display text-2xl font-bold text-foreground">15+</p>
              <p className="text-sm text-muted-foreground">Years of Service</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="font-display text-2xl font-bold text-foreground">98%</p>
              <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/images/hero-clinic.jpg"
              alt="Modern physical therapy clinic interior"
              width={700}
              height={500}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <CalendarCheck className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Next Available</p>
                <p className="text-xs text-muted-foreground">Today, 2:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
