import type { Metadata, Viewport } from 'next'
import { Inter, DM_Sans } from 'next/font/google'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })

export const metadata: Metadata = {
  title: 'Cudiamat Medical Corp. | AI-Powered Appointment System',
  description: 'Your Number 1 Partner in Diagnostic Healthcare Services. Book ECG, ULTRASOUND, EYE CHECK UP, and 2D ECHO appointments seamlessly with our AI-powered scheduling system at Hari Clinic.',
}

export const viewport: Viewport = {
  themeColor: '#e51937',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
