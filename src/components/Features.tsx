import { BarChart3, Wand2, Shield, Eye, Camera, Store, LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: BarChart3,
    title: 'Agent Visibility Score',
    description: 'Instant 0-100 AI readiness grade for every product',
  },
  {
    icon: Wand2,
    title: 'One-Tap AI Optimizer',
    description: 'AI rewrites descriptions, generates metadata, applies Schema.org markup',
  },
  {
    icon: Shield,
    title: 'Protocol Readiness',
    description: 'Auto-comply with Google UCP, OpenAI ACP, and Amazon Buy for Me',
  },
  {
    icon: Eye,
    title: 'AI Agent Monitoring',
    description: 'Track which AI agents recommend you vs competitors',
  },
  {
    icon: Camera,
    title: 'Smart Product Scanner',
    description: 'Point your phone at any product, get an instant AI-ready listing',
  },
  {
    icon: Store,
    title: 'AI Agent Storefront',
    description: 'A hosted storefront built for AI agent discovery from day one',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to{' '}
            <span className="gradient-text">Win AI Commerce</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Six powerful tools that transform your products from invisible to irresistible for every
            major AI shopping agent.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-2xl p-6 glass glass-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
