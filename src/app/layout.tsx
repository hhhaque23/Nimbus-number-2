import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nimbus — Make Your Products Visible to AI Shopping Agents',
  description: 'AI shopping agents are the new customer. Nimbus audits, optimizes, and monitors your product listings so ChatGPT, Gemini, Alexa+, and Perplexity recommend YOU.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
