import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Link href="#home" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Cudiamat Medical Corp. Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <div>
                <p className="font-display text-sm font-bold text-foreground">
                  Cudiamat Medical Corp.
                </p>
                <p className="text-xs text-muted-foreground">Hari Clinic</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Your Number 1 Partner in Diagnostic Healthcare Services. Providing
              quality diagnostic services since 2009.
            </p>
          </div>

          <div>
            <p className="font-display text-sm font-semibold text-foreground">Quick Links</p>
            <nav className="mt-3 flex flex-col gap-2" aria-label="Footer quick links">
              <Link href="#home" className="text-sm text-muted-foreground hover:text-primary">
                Home
              </Link>
              <Link href="#services" className="text-sm text-muted-foreground hover:text-primary">
                Services
              </Link>
              <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary">
                How It Works
              </Link>
              <Link href="#book" className="text-sm text-muted-foreground hover:text-primary">
                Book Appointment
              </Link>
              <Link href="#about" className="text-sm text-muted-foreground hover:text-primary">
                About Us
              </Link>
              <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <p className="font-display text-sm font-semibold text-foreground">Our Services</p>
            <nav className="mt-3 flex flex-col gap-2" aria-label="Footer services">
              <Link href="#services" className="text-sm text-muted-foreground hover:text-primary">
                ULTRASOUND (Tuesday)
              </Link>
              <Link href="#services" className="text-sm text-muted-foreground hover:text-primary">
                EYE CHECK UP (Thursday)
              </Link>
              <Link href="#services" className="text-sm text-muted-foreground hover:text-primary">
                2D ECHO (Friday)
              </Link>
              <Link href="#services" className="text-sm text-muted-foreground hover:text-primary">
                ECG (Saturday)
              </Link>
            </nav>
          </div>

          <div>
            <p className="font-display text-sm font-semibold text-foreground">Clinic Hours</p>
            <div className="mt-3 flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                Tuesday - Saturday
              </p>
              <p className="text-sm font-semibold text-foreground">
                9:00 AM - 1:00 PM
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Sunday & Monday: Closed
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © 2026 Cudiamat Medical Corp. (Hari Clinic). All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            AI-Powered Appointment Booking System
          </p>
        </div>
      </div>
    </footer>
  )
}
