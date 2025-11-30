import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lumin House AI',
  description: 'AI-powered home automation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
