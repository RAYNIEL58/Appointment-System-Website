import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarCheck, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-base text-muted-foreground">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>AI-Powered Diagnostic Services Booking</span>
          </div>

          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
            <span className="text-balance">Your Health, Our Priority.</span>
            <br />
            <span className="text-primary">Book Diagnostic Services.</span>
          </h1>

          <p className="max-w-lg text-xl leading-relaxed text-muted-foreground">
            Experience seamless appointment scheduling powered by AI at Cudiamat
            Medical Corp. — your number 1 partner in diagnostic healthcare services. Book ECG, ULTRASOUND, EYE CHECK UP, or 2D ECHO appointments easily.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-3">
              <Link href="#book">
                <CalendarCheck className="h-6 w-6" />
                Book an Appointment
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#services">View Services</Link>
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div>
              <p className="font-display text-3xl font-bold text-foreground">4</p>
              <p className="text-base text-muted-foreground">Diagnostic Services</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <p className="font-display text-3xl font-bold text-foreground">15+</p>
              <p className="text-base text-muted-foreground">Years of Service</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <p className="font-display text-3xl font-bold text-foreground">Tue-Sat</p>
              <p className="text-base text-muted-foreground">9 AM - 1 PM</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/images/hero-clinic.jpg"
              alt="Cudiamat Medical Corp. diagnostic clinic interior"
              width={700}
              height={500}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-xl border-2 border-border bg-card p-5 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <CalendarCheck className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">Clinic Hours</p>
                <p className="text-sm text-muted-foreground">Tue-Sat, 9 AM - 1 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
