import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prompt Engine Template Version',
  description: 'Template-driven prompt generator with duplicate check',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
