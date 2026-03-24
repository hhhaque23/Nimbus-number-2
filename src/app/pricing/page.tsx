import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: 29,
    popular: false,
    features: [
      'Up to 50 products',
      'Agent Visibility Score',
      'One-Tap Optimizer (50 rewrites/mo)',
      'Basic AI monitoring (ChatGPT only)',
      'Email support',
    ],
  },
  {
    name: 'Growth',
    price: 79,
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
    popular: false,
    features: [
      'Unlimited products',
      'Everything in Growth',
      'Competitor "Steal" Alerts (10 competitors)',
      'Multi-Platform Gap Finder',
      'Data Freshness Monitor',
      'AI Photo Evaluator',
      'Review Health Dashboard',
      'AI Agent Storefront',
      'Priority support',
      'API access',
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Simple, transparent{' '}
              <span className="gradient-text">pricing</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Start free. Scale as you grow. Every plan includes a 14-day free trial
              with no credit card required.
            </p>
          </div>

          {/* Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-[1px] ${
                  tier.popular
                    ? 'bg-gradient-to-b from-blue-500 via-cyan-400 to-emerald-400'
                    : 'bg-white/10'
                }`}
              >
                <div className="rounded-2xl bg-gray-950 p-8 h-full flex flex-col glass">
                  {/* Popular badge */}
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                        Popular
                      </span>
                    </div>
                  )}

                  {/* Tier name & price */}
                  <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold gradient-text">${tier.price}</span>
                    <span className="text-gray-400 ml-1">/mo</span>
                  </div>

                  {/* Features */}
                  <ul className="flex-1 space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                        <Check className="h-4 w-4 mt-0.5 shrink-0 text-cyan-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className={`w-full rounded-lg py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
                        : 'glass glass-hover text-white'
                    }`}
                  >
                    Start Free Trial
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
