import Link from 'next/link';

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-emerald-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Stop Being Invisible to{' '}
          <span className="gradient-text">AI Shoppers</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
          Connect your store in 60 seconds. See your AI Visibility Score instantly. Fix your
          listings in one tap.
        </p>

        <div className="mt-10">
          <Link
            href="/dashboard"
            className="inline-block rounded-xl bg-gradient-to-r from-nimbus-600 to-nimbus-700 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
          >
            Start Your Free Audit
          </Link>
        </div>

        <p className="mt-5 text-sm text-gray-500">
          No credit card required. Works with Shopify, Etsy, WooCommerce, and more.
        </p>
      </div>
    </section>
  );
}
