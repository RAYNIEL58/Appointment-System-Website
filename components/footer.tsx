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
              Your Number 1 Partner in Physical Therapy and Health. Providing
              quality healthcare services since 2009.
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
              <Link href="#about" className="text-sm text-muted-foreground hover:text-primary">
                About Us
              </Link>
            </nav>
          </div>

          <div>
            <p className="font-display text-sm font-semibold text-foreground">Services</p>
            <nav className="mt-3 flex flex-col gap-2" aria-label="Footer services">
              <Link href="#services" className="text-sm text-muted-foreground hover:text-primary">
                Physical Therapy
              </Link>
              <Link href="#services" className="text-sm text-muted-foreground hover:text-primary">
                General Consultation
              </Link>
              <Link href="#services" className="text-sm text-muted-foreground hover:text-primary">
                Sports Medicine
              </Link>
              <Link href="#services" className="text-sm text-muted-foreground hover:text-primary">
                Pain Management
              </Link>
            </nav>
          </div>

          <div>
            <p className="font-display text-sm font-semibold text-foreground">Legal</p>
            <nav className="mt-3 flex flex-col gap-2" aria-label="Footer legal">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Data Protection
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground">
            {'2025 Cudiamat Medical Corp. All rights reserved.'}
          </p>
          <p className="text-xs text-muted-foreground">
            AI-Powered Appointment System for Hari Clinic
          </p>
        </div>
      </div>
    </footer>
  )
}
