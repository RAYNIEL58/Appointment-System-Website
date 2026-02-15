import Image from "next/image"
import { ShieldCheck, Clock, Users, Award } from "lucide-react"

const highlights = [
  {
    icon: ShieldCheck,
    title: "Licensed Professionals",
    description: "Board-certified doctors and licensed physical therapists.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Open 6 days a week with extended hours for your convenience.",
  },
  {
    icon: Users,
    title: "Patient-Centered Care",
    description: "Personalized treatment plans tailored to your recovery goals.",
  },
  {
    icon: Award,
    title: "Trusted Since 2009",
    description: "Over 15 years of excellence in healthcare services.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="bg-muted/50 py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/images/about-clinic.jpg"
              alt="Cudiamat Medical Corp. healthcare team"
              width={600}
              height={450}
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="absolute -right-3 -top-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <span className="font-display text-2xl font-bold text-primary-foreground">15+</span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              About Us
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
              <span className="text-balance">Cudiamat Medical Corp.</span>
            </h2>
            <p className="mt-2 font-display text-lg text-muted-foreground">
              Your Number 1 Partner in Physical Therapy and Health
            </p>
          </div>

          <p className="leading-relaxed text-muted-foreground">
            Established in 2009, Cudiamat Medical Corp. (Hari Clinic) has been at
            the forefront of providing exceptional healthcare services in physical
            therapy and rehabilitation. Our mission is to restore function, reduce
            pain, and improve the quality of life for every patient who walks
            through our doors.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.description}
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
