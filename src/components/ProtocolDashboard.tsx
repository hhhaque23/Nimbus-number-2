'use client'

import { useState } from 'react'
import {
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ArrowRight,
} from 'lucide-react'

interface StoreConfig {
  storeUrl: string
  platform: 'shopify' | 'etsy' | 'woocommerce' | 'squarespace' | 'custom' | ''
  hasGoogleMerchantCenter: boolean
  googleMerchantId: string
  hasStripeIntegration: boolean
  stripeAccountId: string
  hasStructuredData: boolean
  hasProductFeed: boolean
  productFeedUrl: string
  hasReturnPolicy: boolean
  hasShippingInfo: boolean
  hasSSL: boolean
  hasRobotsTxt: boolean
  allowsAICrawlers: boolean
  totalProducts: number
  approvedProducts: number
  hasCheckoutAPI: boolean
  hasInventoryAPI: boolean
}

interface ProtocolCheck {
  name: string
  passed: boolean
  required: boolean
  description: string
  fixInstructions: string
  estimatedTime: string
}

interface ProtocolResult {
  protocol: string
  description: string
  status: 'compliant' | 'partial' | 'action_required' | 'not_started'
  score: number
  checks: ProtocolCheck[]
  nextStep: string
  estimatedTimeToComplete: string
}

const DEFAULT_CONFIG: StoreConfig = {
  storeUrl: '',
  platform: '',
  hasGoogleMerchantCenter: false,
  googleMerchantId: '',
  hasStripeIntegration: false,
  stripeAccountId: '',
  hasStructuredData: false,
  hasProductFeed: false,
  productFeedUrl: '',
  hasReturnPolicy: false,
  hasShippingInfo: false,
  hasSSL: false,
  hasRobotsTxt: false,
  allowsAICrawlers: false,
  totalProducts: 0,
  approvedProducts: 0,
  hasCheckoutAPI: false,
  hasInventoryAPI: false,
}

const SAMPLE_CONFIGS: { label: string; data: Partial<StoreConfig> }[] = [
  {
    label: 'Well-configured Shopify store',
    data: {
      storeUrl: 'https://mystore.myshopify.com',
      platform: 'shopify',
      hasGoogleMerchantCenter: true,
      googleMerchantId: 'MC-12345678',
      hasStripeIntegration: true,
      stripeAccountId: 'acct_1234',
      hasStructuredData: true,
      hasProductFeed: true,
      productFeedUrl: 'https://mystore.myshopify.com/products.json',
      hasReturnPolicy: true,
      hasShippingInfo: true,
      hasSSL: true,
      hasRobotsTxt: true,
      allowsAICrawlers: true,
      totalProducts: 45,
      approvedProducts: 43,
      hasCheckoutAPI: true,
      hasInventoryAPI: true,
    },
  },
  {
    label: 'Partially setup store',
    data: {
      storeUrl: 'https://example-store.com',
      platform: 'woocommerce',
      hasGoogleMerchantCenter: true,
      googleMerchantId: 'MC-87654321',
      hasStripeIntegration: false,
      hasStructuredData: true,
      hasProductFeed: true,
      productFeedUrl: 'https://example-store.com/feed/products',
      hasReturnPolicy: true,
      hasShippingInfo: false,
      hasSSL: true,
      hasRobotsTxt: true,
      allowsAICrawlers: false,
      totalProducts: 120,
      approvedProducts: 95,
      hasCheckoutAPI: false,
      hasInventoryAPI: false,
    },
  },
  {
    label: 'New store (minimal setup)',
    data: {
      storeUrl: 'https://my-new-store.com',
      platform: 'custom',
      hasSSL: true,
      hasReturnPolicy: true,
      totalProducts: 20,
      approvedProducts: 0,
    },
  },
]

function statusConfig(status: string) {
  switch (status) {
    case 'compliant':
      return { color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle, label: 'Compliant' }
    case 'partial':
      return { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', icon: AlertTriangle, label: 'Partial' }
    case 'action_required':
      return { color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', icon: AlertTriangle, label: 'Action Required' }
    default:
      return { color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', icon: XCircle, label: 'Not Started' }
  }
}

export default function ProtocolDashboard() {
  const [config, setConfig] = useState<StoreConfig>(DEFAULT_CONFIG)
  const [results, setResults] = useState<ProtocolResult[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [expandedProtocol, setExpandedProtocol] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(true)

  const update = (field: keyof StoreConfig, value: string | boolean | number) => {
    setConfig(prev => ({ ...prev, [field]: value }))
  }

  const loadSample = (data: Partial<StoreConfig>) => {
    setConfig({ ...DEFAULT_CONFIG, ...data })
  }

  const handleCheck = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/protocols', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      const data = await res.json()
      setResults(data)
      setShowForm(false)
    } catch (err) {
      console.error('Protocol check error:', err)
    } finally {
      setLoading(false)
    }
  }

  const overallScore = results ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Protocol Readiness Dashboard</h2>
        <p className="text-gray-600">Check your store&apos;s compliance with Google UCP, OpenAI ACP, and Amazon Buy for Me.</p>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
          {/* Samples */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Try a sample configuration:</label>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_CONFIGS.map((sample) => (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => loadSample(sample.data)}
                  className="border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs px-3 py-1.5 rounded-full"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Basic info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store URL *</label>
              <input
                type="url"
                value={config.storeUrl}
                onChange={e => update('storeUrl', e.target.value)}
                placeholder="https://yourstore.com"
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-nimbus-500 focus:ring-1 focus:ring-nimbus-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
              <select
                value={config.platform}
                onChange={e => update('platform', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-nimbus-500 focus:ring-1 focus:ring-nimbus-500"
              >
                <option value="" className="bg-white">Select platform</option>
                <option value="shopify" className="bg-white">Shopify</option>
                <option value="etsy" className="bg-white">Etsy</option>
                <option value="woocommerce" className="bg-white">WooCommerce</option>
                <option value="squarespace" className="bg-white">Squarespace</option>
                <option value="custom" className="bg-white">Custom / Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Products</label>
              <input
                type="number"
                value={config.totalProducts || ''}
                onChange={e => update('totalProducts', parseInt(e.target.value) || 0)}
                placeholder="50"
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-nimbus-500 focus:ring-1 focus:ring-nimbus-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Approved Products (Google)</label>
              <input
                type="number"
                value={config.approvedProducts || ''}
                onChange={e => update('approvedProducts', parseInt(e.target.value) || 0)}
                placeholder="45"
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-nimbus-500 focus:ring-1 focus:ring-nimbus-500"
              />
            </div>
          </div>

          {/* Checklist toggles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Current Setup</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {([
                ['hasSSL', 'SSL Certificate (HTTPS)'],
                ['hasGoogleMerchantCenter', 'Google Merchant Center'],
                ['hasStripeIntegration', 'Stripe Integration'],
                ['hasStructuredData', 'Structured Data (Schema.org)'],
                ['hasProductFeed', 'Product Feed (XML/JSON)'],
                ['hasReturnPolicy', 'Published Return Policy'],
                ['hasShippingInfo', 'Shipping Info Published'],
                ['hasRobotsTxt', 'robots.txt Configured'],
                ['allowsAICrawlers', 'AI Crawlers Allowed'],
                ['hasCheckoutAPI', 'Checkout API Endpoint'],
                ['hasInventoryAPI', 'Inventory API'],
              ] as [keyof StoreConfig, string][]).map(([field, label]) => (
                <label key={field} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={config[field] as boolean}
                      onChange={e => update(field, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 rounded border border-gray-300 bg-white peer-checked:bg-nimbus-600 peer-checked:border-nimbus-600 transition-all flex items-center justify-center">
                      {config[field] && <CheckCircle size={14} className="text-white" />}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleCheck}
            disabled={loading || !config.storeUrl}
            className="w-full py-3 px-6 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Checking Compliance...' : 'Check Protocol Readiness'}
          </button>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Overall */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <ShieldCheck size={24} className="text-nimbus-600" />
              <h3 className="text-lg font-semibold text-gray-900">Overall Protocol Readiness</h3>
            </div>
            <div className="flex items-center justify-center gap-8 mb-4">
              <div>
                <span className={`text-5xl font-bold ${overallScore >= 80 ? 'text-emerald-600' : overallScore >= 50 ? 'text-amber-600' : 'text-red-500'}`}>
                  {overallScore}%
                </span>
              </div>
              <div className="text-left">
                <div className="flex gap-3">
                  {results.map(r => {
                    const cfg = statusConfig(r.status)
                    const Icon = cfg.icon
                    return (
                      <div key={r.protocol} className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                        <Icon size={12} />
                        {r.protocol.split(' ')[0]}
                      </div>
                    )
                  })}
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  {results.filter(r => r.status === 'compliant').length}/3 protocols compliant
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="text-sm text-nimbus-600 hover:text-nimbus-700 transition-colors"
            >
              Recheck with different settings
            </button>
          </div>

          {/* Protocol cards */}
          {results.map((result) => {
            const cfg = statusConfig(result.status)
            const Icon = cfg.icon
            const isExpanded = expandedProtocol === result.protocol
            const passedRequired = result.checks.filter(c => c.required && c.passed).length
            const totalRequired = result.checks.filter(c => c.required).length
            const passedOptional = result.checks.filter(c => !c.required && c.passed).length
            const totalOptional = result.checks.filter(c => !c.required).length

            return (
              <div key={result.protocol} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {/* Header */}
                <button
                  onClick={() => setExpandedProtocol(isExpanded ? null : result.protocol)}
                  className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${cfg.bg} border ${cfg.border}`}>
                      <Icon size={24} className={cfg.color} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">{result.protocol}</h3>
                      <p className="text-sm text-gray-600">{result.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${cfg.color}`}>{result.score}%</div>
                      <div className="text-xs text-gray-400">{passedRequired}/{totalRequired} required</div>
                    </div>
                    {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-100 px-6 py-5 space-y-4">
                    {/* Next step banner */}
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-nimbus-50 border border-nimbus-200">
                      <ArrowRight size={18} className="text-nimbus-700 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-nimbus-700">Next Step</p>
                        <p className="text-sm text-gray-700">{result.nextStep}</p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <Clock size={12} />
                          Estimated time to full compliance: {result.estimatedTimeToComplete}
                        </p>
                      </div>
                    </div>

                    {/* Required checks */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Required ({passedRequired}/{totalRequired})</h4>
                      <div className="space-y-2">
                        {result.checks.filter(c => c.required).map((check) => (
                          <div key={check.name} className={`flex items-start gap-3 p-3 rounded-lg ${check.passed ? 'bg-emerald-50' : 'bg-red-50'}`}>
                            {check.passed ? (
                              <CheckCircle size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                            ) : (
                              <XCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${check.passed ? 'text-emerald-700' : 'text-gray-900'}`}>
                                {check.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">{check.description}</p>
                              {!check.passed && (
                                <div className="mt-2 p-2 rounded bg-gray-50 border border-gray-100">
                                  <p className="text-xs text-amber-600 font-medium">How to fix:</p>
                                  <p className="text-xs text-gray-700 mt-0.5">{check.fixInstructions}</p>
                                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                    <Clock size={10} /> {check.estimatedTime}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Optional checks */}
                    {totalOptional > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2">Recommended ({passedOptional}/{totalOptional})</h4>
                        <div className="space-y-2">
                          {result.checks.filter(c => !c.required).map((check) => (
                            <div key={check.name} className={`flex items-start gap-3 p-3 rounded-lg ${check.passed ? 'bg-emerald-50' : 'bg-gray-50'}`}>
                              {check.passed ? (
                                <CheckCircle size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                              ) : (
                                <AlertTriangle size={18} className="text-gray-400 mt-0.5 shrink-0" />
                              )}
                              <div>
                                <p className={`text-sm ${check.passed ? 'text-emerald-700' : 'text-gray-700'}`}>
                                  {check.name}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">{check.description}</p>
                                {!check.passed && (
                                  <p className="text-xs text-gray-400 mt-1">{check.fixInstructions}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
