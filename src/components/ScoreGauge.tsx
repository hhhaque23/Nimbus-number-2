'use client'

interface ScoreGaugeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

export default function ScoreGauge({ score, size = 'md', label }: ScoreGaugeProps) {
  const getColor = (s: number) => {
    if (s >= 80) return { ring: 'text-emerald-400', bg: 'bg-emerald-400', text: 'text-emerald-400' }
    if (s >= 55) return { ring: 'text-yellow-400', bg: 'bg-yellow-400', text: 'text-yellow-400' }
    if (s >= 35) return { ring: 'text-orange-400', bg: 'bg-orange-400', text: 'text-orange-400' }
    return { ring: 'text-red-400', bg: 'bg-red-400', text: 'text-red-400' }
  }

  const colors = getColor(score)

  const sizeConfig = {
    sm: { container: 'w-16 h-16', text: 'text-lg', label: 'text-[10px]' },
    md: { container: 'w-28 h-28', text: 'text-3xl', label: 'text-xs' },
    lg: { container: 'w-40 h-40', text: 'text-5xl', label: 'text-sm' },
  }

  const config = sizeConfig[size]
  const radius = size === 'sm' ? 28 : size === 'md' ? 50 : 70
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference
  const strokeWidth = size === 'sm' ? 3 : 4
  const viewBox = size === 'sm' ? 64 : size === 'md' ? 112 : 160
  const center = viewBox / 2

  return (
    <div className={`${config.container} relative flex items-center justify-center`}>
      <svg className="absolute inset-0 -rotate-90" viewBox={`0 0 ${viewBox} ${viewBox}`}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/10"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`${colors.ring} transition-all duration-1000 ease-out`}
        />
      </svg>
      <div className="text-center z-10">
        <span className={`${config.text} font-bold ${colors.text}`}>{score}</span>
        {label && <p className={`${config.label} text-gray-400 mt-0.5`}>{label}</p>}
      </div>
    </div>
  )
}
