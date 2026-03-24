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
    A: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    B: 'text-blue-700 bg-blue-50 border-blue-200',
    C: 'text-amber-700 bg-amber-50 border-amber-200',
    D: 'text-orange-700 bg-orange-50 border-orange-200',
    F: 'text-red-700 bg-red-50 border-red-200',
  }

  const totalFixes = score.dimensions.reduce((sum, d) => sum + d.fixes.length, 0)

  return (
    <div className="space-y-6">
      {/* Overall score */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
        <h3 className="text-lg text-gray-400 mb-4">Agent Visibility Score</h3>
        <div className="flex items-center justify-center gap-8">
          <ScoreGauge score={score.overall} size="lg" />
          <div className="text-left">
            <span className={`inline-block text-2xl font-bold px-4 py-1 rounded-full border ${gradeColors[score.grade]}`}>
              Grade: {score.grade}
            </span>
            <p className="text-gray-600 mt-3 max-w-md">{score.summary}</p>
            {totalFixes > 0 && (
              <p className="text-sm text-gray-400 mt-2">{totalFixes} improvements available</p>
            )}
          </div>
        </div>

        {score.overall < 85 && (
          <button
            onClick={onOptimize}
            disabled={optimizeLoading}
            className="mt-6 py-3 px-8 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 inline-flex items-center gap-2"
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
            <div key={dim.name} className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{dim.name}</h4>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">Weight: {Math.round(dim.weight * 100)}%</span>
                  <ScoreGauge score={pct} size="sm" />
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-100 rounded-full mb-3">
                <div
                  className={`h-2 rounded-full transition-all duration-700 ${
                    pct >= 80 ? 'bg-emerald-500' : pct >= 55 ? 'bg-amber-400' : pct >= 35 ? 'bg-orange-400' : 'bg-red-500'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* Details */}
              {dim.details.length > 0 && (
                <div className="space-y-1 mb-2">
                  {dim.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                      <span className="text-gray-600">{detail}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Fixes */}
              {dim.fixes.length > 0 && (
                <div className="space-y-1">
                  {dim.fixes.map((fix, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                      <span className="text-gray-500">{fix}</span>
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
