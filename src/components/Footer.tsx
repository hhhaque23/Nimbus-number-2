import Link from 'next/link';
import { Cloud } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
              <Cloud className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-wider gradient-text">NIMBUS</span>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Dashboard
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-gray-500">&copy; 2026 Nimbus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
