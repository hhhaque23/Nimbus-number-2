import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl bg-gray-900 px-8 py-16 sm:px-16 sm:py-20 text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Stop being invisible to AI shoppers
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-gray-400">
            Connect your store in 60 seconds. See your score instantly. Fix your listings in one tap.
          </p>
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Start your free audit
            </Link>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            No credit card required. Works with Shopify, Etsy, WooCommerce, and more.
          </p>
        </div>
      </div>
    </section>
  )
}
