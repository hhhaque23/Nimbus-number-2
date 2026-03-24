import Link from 'next/link';

const stats = [
  { value: '33M+', label: 'Small Businesses' },
  { value: '$1T', label: 'Projected AI Commerce by 2030' },
  { value: '900M', label: 'Weekly ChatGPT Users' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Animated gradient orb */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-600/30 via-cyan-500/20 to-emerald-500/10 blur-[120px] animate-pulse" />
      </div>
      <div className="pointer-events-none absolute top-20 right-0">
        <div className="h-[300px] w-[300px] rounded-full bg-blue-500/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Make Your Products{' '}
          <span className="gradient-text">Visible to AI Shopping Agents</span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
          ChatGPT, Gemini, Alexa+, and Perplexity are the new shoppers. If they can&apos;t read
          your product data, you don&apos;t exist. Nimbus fixes that in under 5 minutes.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-xl bg-gradient-to-r from-nimbus-600 to-nimbus-700 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
          >
            Start Free Audit
          </Link>
          <Link
            href="#features"
            className="rounded-xl border border-white/20 px-8 py-3.5 text-base font-semibold text-gray-200 hover:bg-white/5 hover:border-white/30 transition-all duration-300"
          >
            See How It Works
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold gradient-text sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
