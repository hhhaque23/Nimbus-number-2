'use client'

interface ScoreGaugeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

export default function ScoreGauge({ score, size = 'md', label }: ScoreGaugeProps) {
  const getColor = (s: number) => {
    if (s >= 80) return 'text-emerald-600'
    if (s >= 55) return 'text-amber-600'
    if (s >= 35) return 'text-orange-500'
    return 'text-red-500'
  }

  const getTrack = (s: number) => {
    if (s >= 80) return 'text-emerald-100'
    if (s >= 55) return 'text-amber-100'
    if (s >= 35) return 'text-orange-100'
    return 'text-red-100'
  }

  const color = getColor(score)
  const track = getTrack(score)

  const sizeConfig = {
    sm: { container: 'w-12 h-12', text: 'text-sm font-semibold', label: 'text-[9px]', radius: 20, stroke: 3, viewBox: 48 },
    md: { container: 'w-24 h-24', text: 'text-2xl font-semibold', label: 'text-[10px]', radius: 42, stroke: 4, viewBox: 96 },
    lg: { container: 'w-32 h-32', text: 'text-4xl font-semibold', label: 'text-xs', radius: 56, stroke: 5, viewBox: 128 },
  }

  const cfg = sizeConfig[size]
  const circumference = 2 * Math.PI * cfg.radius
  const offset = circumference - (score / 100) * circumference
  const center = cfg.viewBox / 2

  return (
    <div className={`${cfg.container} relative flex items-center justify-center`}>
      <svg className="absolute inset-0 -rotate-90" viewBox={`0 0 ${cfg.viewBox} ${cfg.viewBox}`}>
        <circle cx={center} cy={center} r={cfg.radius} fill="none" stroke="currentColor" strokeWidth={cfg.stroke} className={track} />
        <circle cx={center} cy={center} r={cfg.radius} fill="none" stroke="currentColor" strokeWidth={cfg.stroke} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className={`${color} transition-all duration-700 ease-out`} />
      </svg>
      <div className="text-center z-10">
        <span className={`${cfg.text} ${color}`}>{score}</span>
        {label && <p className={`${cfg.label} text-gray-400`}>{label}</p>}
      </div>
    </div>
  )
}
