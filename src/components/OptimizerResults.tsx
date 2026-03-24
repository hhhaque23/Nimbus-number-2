'use client'

import { useState } from 'react'
import { VisibilityScore } from '@/lib/types'
import { OptimizedProduct } from '@/lib/types'
import ScoreGauge from './ScoreGauge'
import { ArrowRight, Check, Copy, AlertCircle, Code, FileText, List } from 'lucide-react'

interface OptimizerResultsProps {
  original: {
    title: string
    description: string
    score: VisibilityScore
  }
  optimized: OptimizedProduct & {
    score: VisibilityScore
  }
}

export default function OptimizerResults({ original, optimized }: OptimizerResultsProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'schema' | 'attributes'>('preview')
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const scoreDiff = optimized.score.overall - original.score.overall

  return (
    <div className="space-y-6">
      {/* Score comparison */}
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Optimization Results</h3>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Before</p>
            <ScoreGauge score={original.score.overall} size="md" label={original.score.grade} />
          </div>
          <ArrowRight size={32} className="text-gray-300" />
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">After</p>
            <ScoreGauge score={optimized.score.overall} size="md" label={optimized.score.grade} />
          </div>
          {scoreDiff > 0 && (
            <div className="text-center ml-4">
              <div className="text-3xl font-bold text-emerald-600">+{scoreDiff}</div>
              <p className="text-sm text-gray-400">points gained</p>
            </div>
          )}
        </div>
      </div>

      {/* Improvements list */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
          <Check size={18} className="text-emerald-600" />
          Improvements Applied
        </h4>
        <div className="space-y-2">
          {optimized.improvements.map((imp, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <Check size={14} className="text-emerald-600 mt-0.5 shrink-0" />
              <span className="text-gray-600">{imp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Missing fields warning */}
      {optimized.missingFields.length > 0 && (
        <div className="bg-white border border-amber-200 rounded-xl p-5">
          <h4 className="font-medium text-amber-600 mb-3 flex items-center gap-2">
            <AlertCircle size={18} />
            Missing Fields ({optimized.missingFields.length})
          </h4>
          <p className="text-sm text-gray-600 mb-3">Add these to boost your score further:</p>
          <div className="flex flex-wrap gap-2">
            {optimized.missingFields.map((field, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                {field}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
        {[
          { id: 'preview' as const, label: 'Preview', icon: FileText },
          { id: 'schema' as const, label: 'Schema.org', icon: Code },
          { id: 'attributes' as const, label: 'Attributes', icon: List },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          {/* Title comparison */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Optimized Title</h4>
              <button
                onClick={() => copyToClipboard(optimized.title, 'title')}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                {copied === 'title' ? <Check size={14} /> : <Copy size={14} />}
                {copied === 'title' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                <p className="text-xs text-red-600 mb-1">Before:</p>
                <p className="text-gray-600 line-through">{original.title}</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                <p className="text-xs text-emerald-600 mb-1">After:</p>
                <p className="text-gray-900">{optimized.title}</p>
              </div>
            </div>
          </div>

          {/* Description comparison */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Optimized Description</h4>
              <button
                onClick={() => copyToClipboard(optimized.description, 'desc')}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                {copied === 'desc' ? <Check size={14} /> : <Copy size={14} />}
                {copied === 'desc' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                <p className="text-xs text-red-600 mb-1">Before:</p>
                <p className="text-gray-600 line-through whitespace-pre-wrap text-sm">{original.description}</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                <p className="text-xs text-emerald-600 mb-1">After:</p>
                <p className="text-gray-900 whitespace-pre-wrap text-sm">{optimized.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'schema' && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Schema.org JSON-LD Markup</h4>
            <button
              onClick={() => copyToClipboard(
                `<script type="application/ld+json">\n${JSON.stringify(optimized.schemaOrg, null, 2)}\n</script>`,
                'schema'
              )}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              {copied === 'schema' ? <Check size={14} /> : <Copy size={14} />}
              {copied === 'schema' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Paste this in your product page&apos;s {'<head>'} tag for AI agent discovery:
          </p>
          <pre className="p-4 rounded-lg bg-gray-900 text-gray-100 border border-gray-800 overflow-x-auto text-sm">
            <code>{`<script type="application/ld+json">\n${JSON.stringify(optimized.schemaOrg, null, 2)}\n</script>`}</code>
          </pre>
        </div>
      )}

      {activeTab === 'attributes' && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Structured Product Attributes</h4>
            <button
              onClick={() => copyToClipboard(
                Object.entries(optimized.attributes).map(([k, v]) => `${k}: ${v}`).join('\n'),
                'attrs'
              )}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              {copied === 'attrs' ? <Check size={14} /> : <Copy size={14} />}
              {copied === 'attrs' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="space-y-2">
            {Object.entries(optimized.attributes).map(([key, value]) => {
              const isSuggested = value.startsWith('[')
              return (
                <div key={key} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm font-medium text-gray-400 w-40 shrink-0">{key}</span>
                  <span className={`text-sm ${isSuggested ? 'text-amber-600 italic' : 'text-gray-900'}`}>
                    {value}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
