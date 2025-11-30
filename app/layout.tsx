import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lumin House AI',
  description: 'AI-powered smart home solution',
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
