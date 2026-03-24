'use client'

import { VisibilityScore } from '@/lib/types'
import ScoreGauge from './ScoreGauge'
import { AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react'

interface ScoreResultsProps {
  score: VisibilityScore
  onOptimize: () => void
  optimizeLoading?: boolean
}

export default function ScoreResults({ score, onOptimize, optimizeLoading }: ScoreResultsProps) {
  const gradeColors = {
    A: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    B: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    C: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    D: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
    F: 'text-red-400 bg-red-400/10 border-red-400/30',
  }

  const totalFixes = score.dimensions.reduce((sum, d) => sum + d.fixes.length, 0)

  return (
    <div className="space-y-6">
      {/* Overall score */}
      <div className="glass rounded-2xl p-8 text-center">
        <h3 className="text-lg text-gray-400 mb-4">Agent Visibility Score</h3>
        <div className="flex items-center justify-center gap-8">
          <ScoreGauge score={score.overall} size="lg" />
          <div className="text-left">
            <span className={`inline-block text-2xl font-bold px-4 py-1 rounded-full border ${gradeColors[score.grade]}`}>
              Grade: {score.grade}
            </span>
            <p className="text-gray-300 mt-3 max-w-md">{score.summary}</p>
            {totalFixes > 0 && (
              <p className="text-sm text-gray-500 mt-2">{totalFixes} improvements available</p>
            )}
          </div>
        </div>

        {score.overall < 85 && (
          <button
            onClick={onOptimize}
            disabled={optimizeLoading}
            className="mt-6 py-3 px-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50 inline-flex items-center gap-2"
          >
            {optimizeLoading ? 'Optimizing...' : 'One-Tap Optimize'}
            <ChevronRight size={18} />
          </button>
        )}
      </div>

      {/* Dimension breakdown */}
      <div className="grid grid-cols-1 gap-4">
        {score.dimensions.map((dim) => {
          const pct = dim.maxScore > 0 ? Math.round((dim.score / dim.maxScore) * 100) : 0
          return (
            <div key={dim.name} className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white">{dim.name}</h4>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">Weight: {Math.round(dim.weight * 100)}%</span>
                  <ScoreGauge score={pct} size="sm" />
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-white/10 rounded-full mb-3">
                <div
                  className={`h-2 rounded-full transition-all duration-700 ${
                    pct >= 80 ? 'bg-emerald-400' : pct >= 55 ? 'bg-yellow-400' : pct >= 35 ? 'bg-orange-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* Details */}
              {dim.details.length > 0 && (
                <div className="space-y-1 mb-2">
                  {dim.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-gray-300">{detail}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Fixes */}
              {dim.fixes.length > 0 && (
                <div className="space-y-1">
                  {dim.fixes.map((fix, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <AlertTriangle size={14} className="text-yellow-400 mt-0.5 shrink-0" />
                      <span className="text-gray-400">{fix}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
