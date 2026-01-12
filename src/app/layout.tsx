import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DigiBot101 - AI Voice Assistant Widget',
  description: 'Floating AI voice assistant with Ava Skye and Matt for digital marketing and automation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}