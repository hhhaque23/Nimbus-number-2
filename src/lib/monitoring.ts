// AI Agent Monitoring Engine
// Generates realistic, deterministic monitoring data based on product data.

export interface MonitoringConfig {
  storeName: string
  products: MonitoredProduct[]
  competitors?: string[]
  targetQueries?: string[]
}

export interface MonitoredProduct {
  name: string
  category: string
  visibilityScore: number
}

export type AIPlatform = 'ChatGPT' | 'Gemini' | 'Perplexity' | 'Alexa+' | 'Copilot' | 'AI Overviews'

export interface AIRecommendation {
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

export interface PlatformVisibility {
  platform: AIPlatform
  totalMentions: number
  positiveMentions: number
  queries: number
  topProduct: string
  trend: 'up' | 'down' | 'stable'
  trendPercent: number
}

export interface CompetitorComparison {
  competitor: string
  winsAgainstYou: number
  lossesAgainstYou: number
  topWinningQueries: string[]
}

export interface MonitoringReport {
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

// ---------------------------------------------------------------------------
// Deterministic seed helpers
// ---------------------------------------------------------------------------

function hashString(str: string): number {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

/** Simple seeded PRNG (mulberry32). Returns values in [0, 1). */
function seededRandom(seed: number): () => number {
  let s = seed | 0
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)]
}

function pickN<T>(arr: T[], n: number, rand: () => number): T[] {
  const shuffled = [...arr].sort(() => rand() - 0.5)
  return shuffled.slice(0, Math.min(n, arr.length))
}

// ---------------------------------------------------------------------------
// Query templates
// ---------------------------------------------------------------------------

function generateQueries(product: MonitoredProduct, rand: () => number): string[] {
  const name = product.name.toLowerCase()
  const category = product.category.toLowerCase()

  const templates = [
    `best ${category}`,
    `best ${category} 2026`,
    `top rated ${category}`,
    `${category} recommendations`,
    `${name} review`,
    `is ${name} worth it`,
    `${category} under $150`,
    `${category} under $200`,
    `most popular ${category}`,
    `${category} comparison`,
    `what is the best ${category} right now`,
    `affordable ${category}`,
    `premium ${category}`,
    `${category} for beginners`,
    `${name} vs competitors`,
  ]

  const count = 3 + Math.floor(rand() * 4)
  return pickN(templates, count, rand)
}

// ---------------------------------------------------------------------------
// Description templates
// ---------------------------------------------------------------------------

function generateDescription(
  product: MonitoredProduct,
  sentiment: 'positive' | 'neutral' | 'negative',
  rand: () => number,
): string {
  const positiveTemplates = [
    `${product.name} is highly recommended in the ${product.category} category for its excellent quality and value.`,
    `Among ${product.category} options, ${product.name} stands out for its strong customer reviews and reliable performance.`,
    `${product.name} is a top pick — users consistently praise its build quality and competitive pricing.`,
    `Experts and reviewers frequently highlight ${product.name} as one of the best choices in ${product.category}.`,
  ]

  const neutralTemplates = [
    `${product.name} is a solid option in the ${product.category} space, though some alternatives offer more features.`,
    `${product.name} performs adequately in ${product.category} with average customer satisfaction scores.`,
    `While ${product.name} covers the basics well, it faces stiff competition in ${product.category}.`,
  ]

  const negativeTemplates = [
    `${product.name} was mentioned but not recommended — reviewers noted better alternatives in ${product.category}.`,
    `${product.name} appeared in results but ranked below competitors in ${product.category} due to limited reviews.`,
    `Users searching for ${product.category} may find stronger options than ${product.name} at this price point.`,
  ]

  if (sentiment === 'positive') return pick(positiveTemplates, rand)
  if (sentiment === 'neutral') return pick(neutralTemplates, rand)
  return pick(negativeTemplates, rand)
}

// ---------------------------------------------------------------------------
// Core generation
// ---------------------------------------------------------------------------

const ALL_PLATFORMS: AIPlatform[] = [
  'ChatGPT',
  'Gemini',
  'Perplexity',
  'Alexa+',
  'Copilot',
  'AI Overviews',
]

export function generateMonitoringReport(config: MonitoringConfig): MonitoringReport {
  const seed = hashString(config.storeName + config.products.map((p) => p.name).join('|'))
  const rand = seededRandom(seed)

  const competitors = config.competitors && config.competitors.length > 0
    ? config.competitors
    : ['CompetitorA', 'CompetitorB', 'CompetitorC']

  // ----- Generate recommendations per product -----

  const allRecommendations: AIRecommendation[] = []
  let idCounter = 0

  for (const product of config.products) {
    const pSeed = hashString(product.name)
    const pRand = seededRandom(pSeed + seed)

    let platformCount: number
    let sentimentPool: ('positive' | 'neutral' | 'negative')[]

    if (product.visibilityScore >= 80) {
      platformCount = 4 + Math.floor(pRand() * 3) // 4-6
      sentimentPool = ['positive', 'positive', 'positive', 'neutral']
    } else if (product.visibilityScore >= 50) {
      platformCount = 2 + Math.floor(pRand() * 2) // 2-3
      sentimentPool = ['positive', 'neutral', 'neutral', 'negative']
    } else {
      platformCount = Math.floor(pRand() * 2) // 0-1
      sentimentPool = ['neutral', 'negative', 'negative']
    }

    const platforms = pickN(ALL_PLATFORMS, platformCount, pRand)
    const queries = generateQueries(product, pRand)

    for (const platform of platforms) {
      const query = pick(queries, pRand)
      const sentiment = pick(sentimentPool, pRand)
      const position = sentiment === 'positive'
        ? 1 + Math.floor(pRand() * 2)
        : sentiment === 'neutral'
          ? 2 + Math.floor(pRand() * 3)
          : 3 + Math.floor(pRand() * 3)

      const mentionedCount = 1 + Math.floor(pRand() * 2)
      const competitorsMentioned = pickN(competitors, mentionedCount, pRand)

      // Generate a timestamp within the last 7 days
      const daysAgo = Math.floor(pRand() * 7)
      const hoursAgo = Math.floor(pRand() * 24)
      const ts = new Date(Date.now() - (daysAgo * 86400000 + hoursAgo * 3600000))

      idCounter++
      allRecommendations.push({
        id: `rec-${idCounter}-${hashString(product.name + platform).toString(36).slice(0, 6)}`,
        platform,
        query,
        productName: product.name,
        position,
        sentiment,
        description: generateDescription(product, sentiment, pRand),
        timestamp: ts.toISOString(),
        competitorsMentioned,
      })
    }
  }

  // Trim to 10-15 recent recommendations
  allRecommendations.sort((a, b) => b.timestamp.localeCompare(a.timestamp))
  const targetCount = 10 + Math.floor(rand() * 6)
  const recentRecommendations = allRecommendations.slice(0, Math.min(targetCount, allRecommendations.length))

  // ----- Platform visibility stats -----

  const platformStats: PlatformVisibility[] = ALL_PLATFORMS.map((platform) => {
    const matching = allRecommendations.filter((r) => r.platform === platform)
    const posCount = matching.filter((r) => r.sentiment === 'positive').length
    const uniqueQueries = new Set(matching.map((r) => r.query)).size

    const topProductCounts: Record<string, number> = {}
    for (const r of matching) {
      topProductCounts[r.productName] = (topProductCounts[r.productName] || 0) + 1
    }
    let topProduct = 'N/A'
    let topCount = 0
    for (const name of Object.keys(topProductCounts)) {
      if (topProductCounts[name] > topCount) {
        topProduct = name
        topCount = topProductCounts[name]
      }
    }

    const trendVal = rand()
    const trend: 'up' | 'down' | 'stable' =
      trendVal < 0.45 ? 'up' : trendVal < 0.75 ? 'stable' : 'down'
    const trendPercent = Math.round((rand() * 25 + 1) * 10) / 10

    return {
      platform,
      totalMentions: matching.length,
      positiveMentions: posCount,
      queries: uniqueQueries,
      topProduct,
      trend,
      trendPercent,
    }
  })

  // ----- Competitor comparisons -----

  const competitorComparisons: CompetitorComparison[] = competitors.map((comp) => {
    const cRand = seededRandom(hashString(comp) + seed)
    const wins = Math.floor(cRand() * 8)
    const losses = Math.floor(cRand() * 12)

    const winQueries: string[] = []
    for (const product of config.products.slice(0, 3)) {
      const q = pick(generateQueries(product, cRand), cRand)
      if (!winQueries.includes(q)) winQueries.push(q)
      if (winQueries.length >= 3) break
    }

    return {
      competitor: comp,
      winsAgainstYou: wins,
      lossesAgainstYou: losses,
      topWinningQueries: winQueries,
    }
  })

  // ----- Weekly digest -----

  const highScoreProducts = config.products.filter((p) => p.visibilityScore >= 70)
  const lowScoreProducts = config.products.filter((p) => p.visibilityScore < 50)

  const wins: string[] = []
  const losses: string[] = []
  const actionItems: string[] = []

  // Wins
  if (highScoreProducts.length > 0) {
    const top = highScoreProducts.sort((a, b) => b.visibilityScore - a.visibilityScore)[0]
    wins.push(`"${top.name}" ranked #1 on ${pick(ALL_PLATFORMS, rand)} for "${`best ${top.category.toLowerCase()}`}" queries`)
  }
  const posRecs = recentRecommendations.filter((r) => r.sentiment === 'positive')
  if (posRecs.length > 0) {
    wins.push(`${posRecs.length} positive AI mentions across ${new Set(posRecs.map((r) => r.platform)).size} platforms this week`)
  }
  if (wins.length < 2) {
    wins.push(`Your store "${config.storeName}" appeared in ${allRecommendations.length} AI-generated responses`)
  }
  if (highScoreProducts.length >= 2) {
    wins.push(`${highScoreProducts.length} products maintain strong visibility scores above 70`)
  }

  // Losses
  if (lowScoreProducts.length > 0) {
    const worst = lowScoreProducts.sort((a, b) => a.visibilityScore - b.visibilityScore)[0]
    losses.push(`"${worst.name}" is being outranked by ${pick(competitors, rand)} on most platforms`)
  }
  const negRecs = recentRecommendations.filter((r) => r.sentiment === 'negative')
  if (negRecs.length > 0) {
    losses.push(`${negRecs.length} negative mentions detected — AI agents cited limited reviews or missing details`)
  }
  if (losses.length === 0) {
    losses.push(`Competitor ${pick(competitors, rand)} gained visibility in "${config.products.length > 0 ? config.products[0].category.toLowerCase() : 'your'}" category`)
  }

  // Action items
  if (lowScoreProducts.length > 0) {
    actionItems.push(`Improve product descriptions for ${lowScoreProducts.map((p) => `"${p.name}"`).join(', ')} to boost AI visibility`)
  }
  actionItems.push('Add structured FAQ sections to product pages — AI agents heavily weight Q&A content')
  actionItems.push('Ensure all products have at least 10 verified reviews for better AI recommendation eligibility')
  if (config.products.length > 0) {
    actionItems.push(`Create comparison content: "${config.products[0].name} vs ${pick(competitors, rand)}" to influence head-to-head AI queries`)
  }

  // ----- Aggregate stats -----

  const totalMentions = allRecommendations.length
  const totalQueries = new Set(allRecommendations.map((r) => r.query)).size

  const sentimentPoints = allRecommendations.reduce((acc, r) => {
    if (r.sentiment === 'positive') return acc + 100
    if (r.sentiment === 'neutral') return acc + 50
    return acc + 10
  }, 0)
  const overallSentiment = totalMentions > 0
    ? Math.round(sentimentPoints / totalMentions)
    : 0

  return {
    totalMentions,
    totalQueries,
    overallSentiment,
    platforms: platformStats,
    recentRecommendations,
    competitorComparisons,
    weeklyDigest: {
      wins: wins.slice(0, 3),
      losses: losses.slice(0, 2),
      actionItems: actionItems.slice(0, 4),
    },
  }
}
