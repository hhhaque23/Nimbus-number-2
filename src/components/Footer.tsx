import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <Link href="/" className="text-sm font-semibold text-gray-900 tracking-tight">
            nimbus
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="#features" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Features</Link>
            <Link href="/pricing" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Pricing</Link>
            <Link href="/dashboard" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Dashboard</Link>
          </nav>
          <p className="text-xs text-gray-400">&copy; 2026 Nimbus</p>
        </div>
      </div>
    </footer>
  )
}
