'use client'

import { useState } from 'react'
import {
  Radio,
  TrendingUp,
  TrendingDown,
  Minus,
  MessageSquare,
  Search,
  Clock,
  ThumbsUp,
  ThumbsDown,
  MinusCircle,
  BarChart3,
  Users,
  AlertCircle,
  CheckCircle,
  Plus,
  X,
} from 'lucide-react'

interface MonitoredProduct {
  name: string
  category: string
  visibilityScore: number
}

interface MonitoringConfig {
  storeName: string
  products: MonitoredProduct[]
  competitors: string[]
  targetQueries: string[]
}

type AIPlatform = 'ChatGPT' | 'Gemini' | 'Perplexity' | 'Alexa+' | 'Copilot' | 'AI Overviews'

interface AIRecommendation {
  id: string
  platform: AIPlatform
  query: string
  productName: string
  position: number
  sentiment: 'positive' | 'neutral' | 'negative'
  description: string
  timestamp: string
  competitorsMentioned: string[]
}

interface PlatformVisibility {
  platform: AIPlatform
  totalMentions: number
  positiveMentions: number
  queries: number
  topProduct: string
  trend: 'up' | 'down' | 'stable'
  trendPercent: number
}

interface CompetitorComparison {
  competitor: string
  winsAgainstYou: number
  lossesAgainstYou: number
  topWinningQueries: string[]
}

interface MonitoringReport {
  totalMentions: number
  totalQueries: number
  overallSentiment: number
  platforms: PlatformVisibility[]
  recentRecommendations: AIRecommendation[]
  competitorComparisons: CompetitorComparison[]
  weeklyDigest: {
    wins: string[]
    losses: string[]
    actionItems: string[]
  }
}

const PLATFORM_COLORS: Record<AIPlatform, string> = {
  ChatGPT: 'bg-green-500/20 text-green-400 border-green-500/30',
  Gemini: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Perplexity: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Alexa+': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  Copilot: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  'AI Overviews': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
}

const SAMPLE_CONFIGS: { label: string; data: MonitoringConfig }[] = [
  {
    label: 'Running gear store',
    data: {
      storeName: 'TrailGear Pro',
      products: [
        { name: 'Trail Runner Pro Waterproof', category: 'Running Shoes', visibilityScore: 89 },
        { name: 'Ultralight Running Vest', category: 'Running Accessories', visibilityScore: 72 },
        { name: 'Merino Wool Running Socks', category: 'Running Socks', visibilityScore: 45 },
        { name: 'GPS Sports Watch Elite', category: 'Sports Watches', visibilityScore: 91 },
      ],
      competitors: ['Salomon', 'Brooks', 'Hoka'],
      targetQueries: ['best trail running shoes', 'waterproof running gear', 'ultralight running vest'],
    },
  },
  {
    label: 'Home goods store',
    data: {
      storeName: 'Modern Nest Home',
      products: [
        { name: 'Bamboo Cutting Board Set', category: 'Kitchen', visibilityScore: 62 },
        { name: 'Organic Cotton Throw Blanket', category: 'Home Decor', visibilityScore: 38 },
        { name: 'Ceramic Planter Collection', category: 'Garden', visibilityScore: 55 },
      ],
      competitors: ['West Elm', 'Crate & Barrel'],
      targetQueries: ['sustainable home decor', 'eco-friendly kitchen products'],
    },
  },
]

export default function AIMonitoringDashboard() {
  const [config, setConfig] = useState<MonitoringConfig>({
    storeName: '',
    products: [{ name: '', category: '', visibilityScore: 50 }],
    competitors: [''],
    targetQueries: [''],
  })
  const [report, setReport] = useState<MonitoringReport | null>(null)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'recommendations' | 'competitors' | 'digest'>('overview')

  const loadSample = (data: MonitoringConfig) => {
    setConfig(data)
  }

  const addProduct = () => {
    setConfig(prev => ({
      ...prev,
      products: [...prev.products, { name: '', category: '', visibilityScore: 50 }],
    }))
  }

  const removeProduct = (index: number) => {
    setConfig(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }))
  }

  const updateProduct = (index: number, field: keyof MonitoredProduct, value: string | number) => {
    setConfig(prev => ({
      ...prev,
      products: prev.products.map((p, i) => i === index ? { ...p, [field]: value } : p),
    }))
  }

  const addCompetitor = () => {
    setConfig(prev => ({ ...prev, competitors: [...prev.competitors, ''] }))
  }

  const updateCompetitor = (index: number, value: string) => {
    setConfig(prev => ({
      ...prev,
      competitors: prev.competitors.map((c, i) => i === index ? value : c),
    }))
  }

  const handleMonitor = async () => {
    setLoading(true)
    try {
      const cleanConfig = {
        ...config,
        products: config.products.filter(p => p.name.trim()),
        competitors: config.competitors.filter(c => c.trim()),
        targetQueries: config.targetQueries.filter(q => q.trim()),
      }
      const res = await fetch('/api/monitoring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanConfig),
      })
      const data = await res.json()
      setReport(data)
      setShowForm(false)
    } catch (err) {
      console.error('Monitoring error:', err)
    } finally {
      setLoading(false)
    }
  }

  const sentimentIcon = (s: string) => {
    if (s === 'positive') return <ThumbsUp size={14} className="text-emerald-400" />
    if (s === 'negative') return <ThumbsDown size={14} className="text-red-400" />
    return <MinusCircle size={14} className="text-gray-400" />
  }

  const trendIcon = (t: string) => {
    if (t === 'up') return <TrendingUp size={16} className="text-emerald-400" />
    if (t === 'down') return <TrendingDown size={16} className="text-red-400" />
    return <Minus size={16} className="text-gray-400" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">AI Agent Monitoring</h2>
        <p className="text-gray-400">Track which AI agents recommend your products and how you compare to competitors.</p>
      </div>

      {/* Form */}
      {showForm && (
        <div className="glass rounded-xl p-6 space-y-5">
          {/* Samples */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Try a sample store:</label>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_CONFIGS.map((sample) => (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => loadSample(sample.data)}
                  className="text-xs px-3 py-1.5 rounded-full glass glass-hover text-gray-300"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Store name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Store Name *</label>
            <input
              type="text"
              value={config.storeName}
              onChange={e => setConfig(prev => ({ ...prev, storeName: e.target.value }))}
              placeholder="e.g., My Awesome Store"
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Products */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Products to Monitor</label>
            <div className="space-y-2">
              {config.products.map((product, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <input
                    type="text"
                    value={product.name}
                    onChange={e => updateProduct(i, 'name', e.target.value)}
                    placeholder="Product name"
                    className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
                  />
                  <input
                    type="text"
                    value={product.category}
                    onChange={e => updateProduct(i, 'category', e.target.value)}
                    placeholder="Category"
                    className="w-40 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
                  />
                  <input
                    type="number"
                    value={product.visibilityScore}
                    onChange={e => updateProduct(i, 'visibilityScore', parseInt(e.target.value) || 0)}
                    placeholder="Score"
                    min={0}
                    max={100}
                    className="w-20 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
                  />
                  {config.products.length > 1 && (
                    <button onClick={() => removeProduct(i)} className="p-2 text-gray-500 hover:text-red-400">
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button onClick={addProduct} className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300">
                <Plus size={14} /> Add product
              </button>
            </div>
          </div>

          {/* Competitors */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Competitors to Track</label>
            <div className="flex flex-wrap gap-2">
              {config.competitors.map((comp, i) => (
                <input
                  key={i}
                  type="text"
                  value={comp}
                  onChange={e => updateCompetitor(i, e.target.value)}
                  placeholder="Competitor name"
                  className="w-48 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
                />
              ))}
              <button onClick={addCompetitor} className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 px-3 py-2">
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          <button
            onClick={handleMonitor}
            disabled={loading || !config.storeName}
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating Report...' : 'Generate Monitoring Report'}
          </button>
        </div>
      )}

      {/* Report */}
      {report && (
        <div className="space-y-6">
          {/* Summary stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass rounded-xl p-5">
              <p className="text-sm text-gray-400 mb-1">Total AI Mentions</p>
              <p className="text-3xl font-bold text-white">{report.totalMentions}</p>
              <p className="text-xs text-gray-500 mt-1">across all platforms</p>
            </div>
            <div className="glass rounded-xl p-5">
              <p className="text-sm text-gray-400 mb-1">Queries Tracked</p>
              <p className="text-3xl font-bold text-white">{report.totalQueries}</p>
              <p className="text-xs text-gray-500 mt-1">unique search queries</p>
            </div>
            <div className="glass rounded-xl p-5">
              <p className="text-sm text-gray-400 mb-1">Overall Sentiment</p>
              <p className={`text-3xl font-bold ${report.overallSentiment >= 70 ? 'text-emerald-400' : report.overallSentiment >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                {report.overallSentiment}%
              </p>
              <p className="text-xs text-gray-500 mt-1">positive mentions</p>
            </div>
            <div className="glass rounded-xl p-5">
              <p className="text-sm text-gray-400 mb-1">Platforms Active</p>
              <p className="text-3xl font-bold text-white">{report.platforms.filter(p => p.totalMentions > 0).length}</p>
              <p className="text-xs text-gray-500 mt-1">of 6 AI platforms</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 glass rounded-lg">
            {[
              { id: 'overview' as const, label: 'Platform Overview', icon: BarChart3 },
              { id: 'recommendations' as const, label: 'Recommendations', icon: MessageSquare },
              { id: 'competitors' as const, label: 'Competitors', icon: Users },
              { id: 'digest' as const, label: 'Weekly Digest', icon: Radio },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Platform Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {report.platforms.map((platform) => (
                <div key={platform.platform} className="glass rounded-xl p-5 glass-hover">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${PLATFORM_COLORS[platform.platform]}`}>
                      {platform.platform}
                    </span>
                    <div className="flex items-center gap-1">
                      {trendIcon(platform.trend)}
                      <span className={`text-xs ${platform.trend === 'up' ? 'text-emerald-400' : platform.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                        {platform.trendPercent > 0 ? '+' : ''}{platform.trendPercent}%
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Mentions</span>
                      <span className="text-sm font-medium text-white">{platform.totalMentions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Positive</span>
                      <span className="text-sm font-medium text-emerald-400">{platform.positiveMentions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Queries</span>
                      <span className="text-sm font-medium text-white">{platform.queries}</span>
                    </div>
                    {platform.topProduct && (
                      <div className="pt-2 mt-2 border-t border-white/5">
                        <span className="text-xs text-gray-500">Top product: </span>
                        <span className="text-xs text-cyan-400">{platform.topProduct}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recommendations feed */}
          {activeTab === 'recommendations' && (
            <div className="glass rounded-xl overflow-hidden">
              <div className="divide-y divide-white/5">
                {report.recentRecommendations.map((rec) => (
                  <div key={rec.id} className="px-6 py-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {sentimentIcon(rec.sentiment)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${PLATFORM_COLORS[rec.platform]}`}>
                            {rec.platform}
                          </span>
                          <span className="text-xs text-gray-500">#{rec.position} result</span>
                          <span className="text-xs text-gray-600 flex items-center gap-1">
                            <Clock size={10} /> {rec.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mb-1">
                          <span className="text-white font-medium">{rec.productName}</span> appeared for query:
                        </p>
                        <p className="text-sm text-cyan-400 flex items-center gap-1">
                          <Search size={12} /> &quot;{rec.query}&quot;
                        </p>
                        <p className="text-xs text-gray-500 mt-1 italic">&quot;{rec.description}&quot;</p>
                        {rec.competitorsMentioned.length > 0 && (
                          <div className="flex items-center gap-1 mt-2">
                            <span className="text-xs text-gray-600">Also mentioned:</span>
                            {rec.competitorsMentioned.map(c => (
                              <span key={c} className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400">{c}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Competitors */}
          {activeTab === 'competitors' && (
            <div className="space-y-4">
              {report.competitorComparisons.map((comp) => {
                const total = comp.winsAgainstYou + comp.lossesAgainstYou
                const winRate = total > 0 ? Math.round((comp.lossesAgainstYou / total) * 100) : 0
                return (
                  <div key={comp.competitor} className="glass rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-white">vs. {comp.competitor}</h3>
                      <span className={`text-sm font-medium ${winRate >= 60 ? 'text-emerald-400' : winRate >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                        You win {winRate}% of matchups
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 rounded-lg bg-emerald-400/5 border border-emerald-400/10">
                        <p className="text-2xl font-bold text-emerald-400">{comp.lossesAgainstYou}</p>
                        <p className="text-xs text-gray-400">You win</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-red-400/5 border border-red-400/10">
                        <p className="text-2xl font-bold text-red-400">{comp.winsAgainstYou}</p>
                        <p className="text-xs text-gray-400">They win</p>
                      </div>
                    </div>
                    {/* Win rate bar */}
                    <div className="w-full h-2 bg-red-400/30 rounded-full overflow-hidden mb-3">
                      <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${winRate}%` }} />
                    </div>
                    {comp.topWinningQueries.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Queries they beat you on:</p>
                        <div className="flex flex-wrap gap-1">
                          {comp.topWinningQueries.map(q => (
                            <span key={q} className="text-xs px-2 py-1 rounded bg-red-400/10 text-red-400 border border-red-400/20">
                              &quot;{q}&quot;
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Weekly digest */}
          {activeTab === 'digest' && (
            <div className="space-y-4">
              <div className="glass rounded-xl p-5">
                <h3 className="font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                  <CheckCircle size={18} /> Wins This Week
                </h3>
                <div className="space-y-2">
                  {report.weeklyDigest.wins.map((win, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-gray-300">{win}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-5">
                <h3 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <AlertCircle size={18} /> Losses This Week
                </h3>
                <div className="space-y-2">
                  {report.weeklyDigest.losses.map((loss, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <AlertCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
                      <span className="text-gray-300">{loss}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-5">
                <h3 className="font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                  <Radio size={18} /> Action Items
                </h3>
                <div className="space-y-2">
                  {report.weeklyDigest.actionItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-cyan-400 font-bold shrink-0">{i + 1}.</span>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowForm(true)}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Run new monitoring report
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
