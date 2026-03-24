import { BarChart3, Wand2, Shield, Eye, Camera, Store, LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: BarChart3,
    title: 'Agent Visibility Score',
    description: 'Instant 0-100 AI readiness grade for every product. See exactly where you stand across 7 dimensions AI agents evaluate.',
  },
  {
    icon: Wand2,
    title: 'One-Tap Optimizer',
    description: 'Rewrite descriptions, generate metadata, and apply Schema.org markup automatically. Copy-paste ready.',
  },
  {
    icon: Shield,
    title: 'Protocol Readiness',
    description: 'Check compliance with Google UCP, OpenAI ACP, and Amazon Buy for Me. Step-by-step fix instructions.',
  },
  {
    icon: Eye,
    title: 'AI Agent Monitoring',
    description: 'Track which AI agents recommend you, for which queries, and how you compare to competitors.',
  },
  {
    icon: Camera,
    title: 'Smart Product Scanner',
    description: 'Point your phone at any product. AI generates a description, suggests pricing, and creates a structured listing.',
  },
  {
    icon: Store,
    title: 'AI Agent Storefront',
    description: 'A hosted storefront built for AI agent discovery from day one. Schema.org, checkout, and feeds included.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Everything you need to win AI commerce
          </h2>
          <p className="mt-3 text-gray-500">
            Six tools that transform your products from invisible to recommended.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-nimbus-50">
                  <Icon className="h-5 w-5 text-nimbus-600" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
