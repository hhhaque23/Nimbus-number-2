'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Cloud,
  LayoutDashboard,
  Package,
  Radio,
  ShieldCheck,
  Users,
  Settings,
  Plus,
  Eye,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MessageSquare,
  TrendingUp,
  Bell,
} from 'lucide-react';

const sidebarItems = [
  { label: 'Overview', icon: LayoutDashboard, active: true },
  { label: 'Products', icon: Package, active: false },
  { label: 'AI Monitoring', icon: Radio, active: false },
  { label: 'Protocol Status', icon: ShieldCheck, active: false },
  { label: 'Competitors', icon: Users, active: false },
  { label: 'Settings', icon: Settings, active: false },
];

const products = [
  { name: 'Trail Runner Pro - Blue', score: 89, status: 'Optimized', mentions: 23 },
  { name: 'Organic Cotton Tee - White', score: 45, status: 'Needs Fix', mentions: 3 },
  { name: 'Leather Weekender Bag', score: 67, status: 'Partial', mentions: 12 },
  { name: 'Bamboo Water Bottle 32oz', score: 34, status: 'Critical', mentions: 0 },
  { name: 'Wireless Earbuds SE', score: 91, status: 'Optimized', mentions: 45 },
];

const protocols = [
  {
    name: 'Google UCP',
    status: 'Compliant',
    color: 'emerald',
    description: 'Feed validated, 38/38 products approved',
  },
  {
    name: 'OpenAI ACP',
    status: 'Action Required',
    color: 'yellow',
    description: 'Stripe integration pending',
  },
  {
    name: 'Amazon Buy for Me',
    status: 'Not Started',
    color: 'red',
    description: 'Setup takes ~10 minutes',
  },
];

const aiRecommendations = [
  {
    platform: 'ChatGPT',
    text: "recommended 'Trail Runner Pro' for 'best trail running shoes under $150'",
    time: '2 hours ago',
  },
  {
    platform: 'Gemini',
    text: "featured 'Wireless Earbuds SE' in comparison for 'affordable wireless earbuds'",
    time: '5 hours ago',
  },
  {
    platform: 'Perplexity',
    text: "cited your store for 'sustainable cotton clothing'",
    time: '1 day ago',
  },
];

function scoreColor(score: number) {
  if (score >= 80) return 'text-emerald-400';
  if (score >= 50) return 'text-yellow-400';
  return 'text-red-400';
}

function scoreBg(score: number) {
  if (score >= 80) return 'bg-emerald-400';
  if (score >= 50) return 'bg-yellow-400';
  return 'bg-red-400';
}

function statusBadge(status: string) {
  switch (status) {
    case 'Optimized':
      return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
    case 'Partial':
      return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20';
    case 'Needs Fix':
      return 'bg-red-400/10 text-red-400 border-red-400/20';
    case 'Critical':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    default:
      return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
  }
}

function protocolBadgeColor(color: string) {
  switch (color) {
    case 'emerald':
      return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
    case 'yellow':
      return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20';
    case 'red':
      return 'bg-red-400/10 text-red-400 border-red-400/20';
    default:
      return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
  }
}

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('Overview');

  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-gray-950/80">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
            <Cloud className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-wider gradient-text">NIMBUS</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500/15 to-cyan-500/10 text-white border border-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : ''}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 lg:px-8 py-4">
          <div>
            <h1 className="text-xl font-semibold text-white">Welcome back</h1>
            <p className="text-sm text-gray-400">Here&apos;s how your products are performing with AI agents.</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
            <Plus className="h-4 w-4" />
            Connect Store
          </button>
        </div>

        <div className="px-6 lg:px-8 py-6 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* AI Visibility Score */}
            <div className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-400">AI Visibility Score</p>
                <TrendingUp className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold gradient-text">72</span>
                <span className="text-sm text-gray-500 mb-1">/100</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
              </div>
            </div>

            {/* Products Optimized */}
            <div className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-400">Products Optimized</p>
                <Package className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold text-white">24</span>
                <span className="text-sm text-gray-500 mb-1">/38</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[63%] rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-400">AI Recommendations</p>
                <MessageSquare className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold text-white">156</span>
                <span className="text-sm text-gray-500 mb-1">this week</span>
              </div>
              <p className="text-xs text-emerald-400 mt-3">+23% from last week</p>
            </div>

            {/* Competitor Alerts */}
            <div className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-400">Competitor Alerts</p>
                <Bell className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold text-white">3</span>
                <span className="text-sm text-gray-500 mb-1">new</span>
              </div>
              <p className="text-xs text-yellow-400 mt-3">2 require attention</p>
            </div>
          </div>

          {/* Products Table */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Products</h2>
              <span className="text-sm text-gray-400">38 total products</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                      AI Mentions
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((product) => (
                    <tr key={product.name} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-white">{product.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${scoreBg(product.score)}`} />
                          <span className={`text-sm font-semibold ${scoreColor(product.score)}`}>
                            {product.score}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadge(product.status)}`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{product.mentions}</td>
                      <td className="px-6 py-4">
                        {product.status === 'Optimized' ? (
                          <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
                            <Eye className="h-3.5 w-3.5" />
                            View
                          </button>
                        ) : (
                          <button className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
                            <Wrench className="h-3 w-3" />
                            {product.status === 'Partial' ? 'Optimize' : 'Fix Now'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Protocol Status */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Protocol Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {protocols.map((protocol) => (
                <div key={protocol.name} className="glass rounded-xl p-5 glass-hover">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white">{protocol.name}</h3>
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${protocolBadgeColor(protocol.color)}`}
                    >
                      {protocol.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{protocol.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Agent Monitoring */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Recent AI Recommendations</h2>
              <Link href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                View all
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {aiRecommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-4 px-6 py-4 hover:bg-white/5 transition-colors">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20">
                    <MessageSquare className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold text-white">{rec.platform}</span>{' '}
                      {rec.text}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {rec.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
