import { Unlock, MessageCircle, Radar, RefreshCw, Bell } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface AdvancedFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const advancedFeatures: AdvancedFeature[] = [
  {
    icon: Unlock,
    title: 'AI Crawler Access Manager',
    description: 'Unblock yourself from AI agents in one tap',
  },
  {
    icon: MessageCircle,
    title: 'Reddit Presence Tracker',
    description:
      'Reddit is the #1 source AI agents use to validate recommendations',
  },
  {
    icon: Radar,
    title: 'Multi-Platform Visibility Gap Finder',
    description: "See where you're visible and invisible per AI platform",
  },
  {
    icon: RefreshCw,
    title: 'Real-Time Data Freshness Monitor',
    description: 'Stale data makes AI agents mark you as unreliable',
  },
  {
    icon: Bell,
    title: "Competitor 'Steal' Alerts",
    description: 'Real-time alerts when a competitor takes your spot',
  },
];

export default function AdvancedFeatures() {
  return (
    <section className="relative py-24 sm:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2">
        <div className="h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="gradient-text">Intelligence Layer</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Capabilities no competitor offers at any price.
          </p>
        </div>

        {/* Feature list */}
        <div className="mx-auto mt-16 max-w-3xl space-y-4">
          {advancedFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group flex items-start gap-4 rounded-2xl p-5 glass glass-hover"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-emerald-400 shadow-lg shadow-cyan-500/20">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                  <p className="mt-0.5 text-sm text-gray-400">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
