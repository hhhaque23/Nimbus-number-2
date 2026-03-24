'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  Package,
  Radio,
  ShieldCheck,
  Users,
  Settings,
  Plus,
  Eye,
  Clock,
  MessageSquare,
  TrendingUp,
  Bell,
  Zap,
  ArrowLeft,
} from 'lucide-react'
import { ProductData, VisibilityScore, OptimizedProduct } from '@/lib/types'
import ProductForm from '@/components/ProductForm'
import ScoreResults from '@/components/ScoreResults'
import OptimizerResults from '@/components/OptimizerResults'
import ProtocolDashboard from '@/components/ProtocolDashboard'
import AIMonitoringDashboard from '@/components/AIMonitoringDashboard'

const sidebarItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Score Product', icon: Zap },
  { label: 'Products', icon: Package },
  { label: 'AI Monitoring', icon: Radio },
  { label: 'Protocol Status', icon: ShieldCheck },
  { label: 'Competitors', icon: Users },
  { label: 'Settings', icon: Settings },
]

const mockProducts = [
  { name: 'Trail Runner Pro - Blue', score: 89, status: 'Optimized', mentions: 23 },
  { name: 'Organic Cotton Tee - White', score: 45, status: 'Needs Fix', mentions: 3 },
  { name: 'Leather Weekender Bag', score: 67, status: 'Partial', mentions: 12 },
  { name: 'Bamboo Water Bottle 32oz', score: 34, status: 'Critical', mentions: 0 },
  { name: 'Wireless Earbuds SE', score: 91, status: 'Optimized', mentions: 45 },
]

const protocols = [
  { name: 'Google UCP', status: 'Compliant', color: 'emerald', description: 'Feed validated, 38/38 products approved' },
  { name: 'OpenAI ACP', status: 'Action Required', color: 'amber', description: 'Stripe integration pending' },
  { name: 'Amazon Buy for Me', status: 'Not Started', color: 'red', description: 'Setup takes ~10 minutes' },
]

const aiRecommendations = [
  { platform: 'ChatGPT', text: "recommended 'Trail Runner Pro' for 'best trail running shoes under $150'", time: '2 hours ago' },
  { platform: 'Gemini', text: "featured 'Wireless Earbuds SE' in comparison for 'affordable wireless earbuds'", time: '5 hours ago' },
  { platform: 'Perplexity', text: "cited your store for 'sustainable cotton clothing'", time: '1 day ago' },
]

function scoreColor(score: number) {
  if (score >= 80) return 'text-emerald-600'
  if (score >= 50) return 'text-amber-600'
  return 'text-red-500'
}

function scoreBg(score: number) {
  if (score >= 80) return 'bg-emerald-500'
  if (score >= 50) return 'bg-amber-500'
  return 'bg-red-500'
}

function statusBadge(status: string) {
  switch (status) {
    case 'Optimized': return 'bg-emerald-50 text-emerald-700'
    case 'Partial': return 'bg-amber-50 text-amber-700'
    case 'Needs Fix': return 'bg-red-50 text-red-700'
    case 'Critical': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-50 text-gray-600'
  }
}

function protocolBadgeColor(color: string) {
  switch (color) {
    case 'emerald': return 'bg-emerald-50 text-emerald-700'
    case 'amber': return 'bg-amber-50 text-amber-700'
    case 'red': return 'bg-red-50 text-red-700'
    default: return 'bg-gray-50 text-gray-600'
  }
}

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [scoreLoading, setScoreLoading] = useState(false)
  const [optimizeLoading, setOptimizeLoading] = useState(false)
  const [scoreResult, setScoreResult] = useState<VisibilityScore | null>(null)
  const [optimizeResult, setOptimizeResult] = useState<{
    original: { title: string; description: string; score: VisibilityScore }
    optimized: OptimizedProduct & { score: VisibilityScore }
  } | null>(null)
  const [currentProduct, setCurrentProduct] = useState<ProductData | null>(null)

  const handleScore = async (product: ProductData) => {
    setScoreLoading(true)
    setScoreResult(null)
    setOptimizeResult(null)
    setCurrentProduct(product)
    try {
      const res = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })
      const data = await res.json()
      setScoreResult(data)
    } catch (err) {
      console.error('Score error:', err)
    } finally {
      setScoreLoading(false)
    }
  }

  const handleOptimize = async () => {
    if (!currentProduct) return
    setOptimizeLoading(true)
    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProduct),
      })
      const data = await res.json()
      setOptimizeResult(data)
    } catch (err) {
      console.error('Optimize error:', err)
    } finally {
      setOptimizeLoading(false)
    }
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">AI Visibility Score</p>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-semibold text-gray-900">72</span>
            <span className="text-sm text-gray-400 mb-1">/100</span>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full w-[72%] rounded-full bg-amber-500" />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">Products Optimized</p>
            <Package className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex items-end gap-1">
            <span className="text-3xl font-semibold text-gray-900">24</span>
            <span className="text-sm text-gray-400 mb-1">/38</span>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full w-[63%] rounded-full bg-nimbus-500" />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">AI Recommendations</p>
            <MessageSquare className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex items-end gap-1">
            <span className="text-3xl font-semibold text-gray-900">156</span>
            <span className="text-sm text-gray-400 mb-1">this week</span>
          </div>
          <p className="text-xs text-emerald-600 mt-3">+23% from last week</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">Competitor Alerts</p>
            <Bell className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex items-end gap-1">
            <span className="text-3xl font-semibold text-gray-900">3</span>
            <span className="text-sm text-gray-400 mb-1">new</span>
          </div>
          <p className="text-xs text-amber-600 mt-3">2 require attention</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Products</h2>
          <button
            onClick={() => setActiveNav('Score Product')}
            className="text-sm text-nimbus-600 hover:text-nimbus-700 transition-colors flex items-center gap-1"
          >
            <Zap size={14} />
            Score a product
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Score</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">AI Mentions</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockProducts.map((product) => (
                <tr key={product.name} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`h-1.5 w-1.5 rounded-full ${scoreBg(product.score)}`} />
                      <span className={`text-sm font-medium ${scoreColor(product.score)}`}>{product.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.mentions}</td>
                  <td className="px-6 py-4">
                    {product.status === 'Optimized' ? (
                      <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors">
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveNav('Score Product')}
                        className="text-sm font-medium text-nimbus-600 hover:text-nimbus-700 transition-colors"
                      >
                        {product.status === 'Partial' ? 'Optimize' : 'Fix now'}
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
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Protocol Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {protocols.map((protocol) => (
            <div key={protocol.name} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{protocol.name}</h3>
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${protocolBadgeColor(protocol.color)}`}>
                  {protocol.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">{protocol.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Recent AI Recommendations</h2>
          <button onClick={() => setActiveNav('AI Monitoring')} className="text-sm text-nimbus-600 hover:text-nimbus-700 transition-colors">
            View all
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {aiRecommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-3 px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gray-100">
                <MessageSquare className="h-3.5 w-3.5 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">{rec.platform}</span> {rec.text}
                </p>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {rec.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderScoreProduct = () => (
    <div className="space-y-6">
      <button
        onClick={() => { setActiveNav('Overview'); setScoreResult(null); setOptimizeResult(null) }}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Overview
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Agent Visibility Score</h2>
          <p className="text-gray-500 text-sm mb-6">Enter your product details to get an instant AI readiness audit across 7 dimensions.</p>
          <ProductForm onSubmit={handleScore} loading={scoreLoading} />
        </div>

        <div>
          {scoreLoading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-10 h-10 border-3 border-gray-200 border-t-nimbus-600 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400 text-sm">Analyzing your product...</p>
              </div>
            </div>
          )}

          {!scoreLoading && !scoreResult && !optimizeResult && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center border border-dashed border-gray-200 rounded-xl p-12">
                <Zap size={32} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400">Enter a product or try a sample</p>
                <p className="text-gray-300 text-sm mt-1">Results will appear here</p>
              </div>
            </div>
          )}

          {scoreResult && !optimizeResult && (
            <ScoreResults
              score={scoreResult}
              onOptimize={handleOptimize}
              optimizeLoading={optimizeLoading}
            />
          )}

          {optimizeResult && (
            <OptimizerResults
              original={optimizeResult.original}
              optimized={optimizeResult.optimized}
            />
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-60 flex-col border-r border-gray-200 bg-white">
        <div className="px-6 py-5 border-b border-gray-100">
          <Link href="/" className="text-lg font-semibold text-gray-900 tracking-tight">
            nimbus
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = activeNav === item.label
            return (
              <button
                key={item.label}
                onClick={() => { setActiveNav(item.label); if (item.label !== 'Score Product') { setScoreResult(null); setOptimizeResult(null) } }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 lg:px-8 py-4">
          <div>
            <h1 className="text-base font-semibold text-gray-900">
              {activeNav === 'Score Product' ? 'Score & Optimize'
                : activeNav === 'Protocol Status' ? 'Protocol Readiness'
                : activeNav === 'AI Monitoring' ? 'AI Agent Monitoring'
                : 'Overview'}
            </h1>
            <p className="text-sm text-gray-400">
              {activeNav === 'Score Product'
                ? 'Audit your product and optimize it for AI agent visibility.'
                : activeNav === 'Protocol Status'
                ? 'Check compliance with Google UCP, OpenAI ACP, and Amazon Buy for Me.'
                : activeNav === 'AI Monitoring'
                ? 'Track your presence across AI shopping platforms.'
                : 'How your products are performing with AI agents.'}
            </p>
          </div>
          {activeNav === 'Overview' && (
            <button
              onClick={() => setActiveNav('Score Product')}
              className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Score Product
            </button>
          )}
        </div>

        <div className="px-6 lg:px-8 py-6">
          {activeNav === 'Overview' && renderOverview()}
          {activeNav === 'Score Product' && renderScoreProduct()}
          {activeNav === 'Protocol Status' && <ProtocolDashboard />}
          {activeNav === 'AI Monitoring' && <AIMonitoringDashboard />}
          {!['Overview', 'Score Product', 'Protocol Status', 'AI Monitoring'].includes(activeNav) && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center border border-dashed border-gray-200 rounded-xl p-12">
                <Package size={32} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400">{activeNav}</p>
                <p className="text-gray-300 text-sm mt-1">Coming soon</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
