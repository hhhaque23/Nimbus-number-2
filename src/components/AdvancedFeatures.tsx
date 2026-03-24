import { Unlock, MessageCircle, Radar, RefreshCw, Bell, LucideIcon } from 'lucide-react'

interface AdvancedFeature {
  icon: LucideIcon
  title: string
  description: string
}

const advancedFeatures: AdvancedFeature[] = [
  {
    icon: Unlock,
    title: 'AI Crawler Access Manager',
    description: 'Most stores accidentally block AI crawlers via robots.txt or Cloudflare. One-tap detection and fix.',
  },
  {
    icon: MessageCircle,
    title: 'Reddit Presence Tracker',
    description: 'Reddit is the #1 source AI agents use to validate recommendations. Track mentions, sentiment, and engagement opportunities.',
  },
  {
    icon: Radar,
    title: 'Multi-Platform Visibility Gap Finder',
    description: 'See exactly where you\'re visible and invisible across ChatGPT, Gemini, Perplexity, and more.',
  },
  {
    icon: RefreshCw,
    title: 'Real-Time Data Freshness Monitor',
    description: 'Stale pricing or stock data makes AI agents skip you. Stay synced across all channels.',
  },
  {
    icon: Bell,
    title: 'Competitor Steal Alerts',
    description: 'Get notified when a competitor takes your spot in AI recommendations, with root cause analysis.',
  },
]

export default function AdvancedFeatures() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-nimbus-600 mb-2">Intelligence layer</p>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Capabilities no competitor offers
          </h2>
          <p className="mt-3 text-gray-500">
            Deep market intelligence that turns Nimbus from a tool you use once into a daily habit.
          </p>
        </div>

        <div className="mt-14 space-y-6 max-w-3xl">
          {advancedFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <Icon className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
