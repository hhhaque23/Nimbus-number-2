import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Check } from 'lucide-react'

const tiers = [
  {
    name: 'Starter',
    price: 29,
    description: 'For solo sellers getting started with AI visibility.',
    popular: false,
    features: [
      'Up to 50 products',
      'Agent Visibility Score',
      'One-Tap Optimizer (50 rewrites/mo)',
      'Basic AI monitoring (ChatGPT)',
      'Email support',
    ],
  },
  {
    name: 'Growth',
    price: 79,
    description: 'For growing brands that need full platform coverage.',
    popular: true,
    features: [
      'Up to 500 products',
      'Everything in Starter',
      'Full AI monitoring (all platforms)',
      'Protocol Readiness Dashboard',
      'Competitor tracking (3 competitors)',
      'Reddit Presence Tracker',
      'Crawler Access Manager',
      'Weekly digest reports',
    ],
  },
  {
    name: 'Pro',
    price: 149,
    description: 'For established brands competing at scale.',
    popular: false,
    features: [
      'Unlimited products',
      'Everything in Growth',
      'Competitor Steal Alerts (10 competitors)',
      'Multi-Platform Gap Finder',
      'Data Freshness Monitor',
      'AI Photo Evaluator',
      'Review Health Dashboard',
      'AI Agent Storefront',
      'Priority support & API access',
    ],
  },
]

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
              Simple pricing
            </h1>
            <p className="mt-3 text-gray-500 max-w-lg mx-auto">
              Start free. Scale as you grow. Every plan includes a 14-day trial, no credit card required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-xl p-8 flex flex-col ${
                  tier.popular
                    ? 'ring-2 ring-gray-900 bg-white'
                    : 'border border-gray-200 bg-white'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-6">
                    <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
                      Most popular
                    </span>
                  </div>
                )}

                <h3 className="text-sm font-semibold text-gray-900">{tier.name}</h3>
                <p className="mt-1 text-sm text-gray-400">{tier.description}</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-semibold text-gray-900">${tier.price}</span>
                  <span className="text-sm text-gray-400">/mo</span>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-gray-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${
                    tier.popular
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Start free trial
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
