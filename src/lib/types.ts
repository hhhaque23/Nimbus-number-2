export interface ProductData {
  id?: string
  title: string
  description: string
  price?: number
  currency?: string
  availability?: string
  brand?: string
  category?: string
  images?: string[]
  materials?: string
  dimensions?: string
  weight?: string
  useCases?: string
  careInstructions?: string
  compatibility?: string
  ingredients?: string
  sizeChart?: string
  returnPolicy?: string
  returnWindow?: string
  shippingTimeline?: string
  reviewCount?: number
  averageRating?: number
  sku?: string
  gtin?: string
  mpn?: string
  color?: string
  size?: string
}

export interface ScoreDimension {
  name: string
  score: number
  maxScore: number
  weight: number
  details: string[]
  fixes: string[]
}

export interface VisibilityScore {
  overall: number
  dimensions: ScoreDimension[]
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  summary: string
}

export interface OptimizedProduct {
  title: string
  description: string
  attributes: Record<string, string>
  schemaOrg: object
  missingFields: string[]
  improvements: string[]
}
