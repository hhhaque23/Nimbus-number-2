import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nimbus — Make Your Products Visible to AI Shopping Agents',
  description: 'Nimbus audits, optimizes, and monitors your product listings so AI agents like ChatGPT, Gemini, and Perplexity recommend your products.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  )
}
