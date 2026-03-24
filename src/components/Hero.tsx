import Link from 'next/link'

export default function Hero() {
  return (
    <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium text-nimbus-600 mb-4">For Shopify, Etsy, and DTC brands</p>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-[1.1]">
            Make your products visible to AI shopping agents
          </h1>
          <p className="mt-6 text-lg text-gray-500 leading-relaxed">
            ChatGPT, Gemini, and Perplexity are the new shoppers. If they can&apos;t read your
            product data, you don&apos;t exist. Nimbus audits, optimizes, and monitors your
            listings in under 5 minutes.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Start free audit
          </Link>
          <Link
            href="#features"
            className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            See how it works
          </Link>
        </div>

        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-8 border-t border-gray-100 pt-10">
          {[
            { value: '33M+', label: 'Small businesses in the US' },
            { value: '$1T', label: 'Projected AI commerce by 2030' },
            { value: '900M', label: 'Weekly ChatGPT users' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
