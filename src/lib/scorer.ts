import { ProductData, ScoreDimension, VisibilityScore } from './types'

function scoreTitle(product: ProductData): ScoreDimension {
  const fixes: string[] = []
  const details: string[] = []
  let score = 0
  const title = product.title.trim()

  // Length check (ideal: 50-150 chars)
  if (title.length >= 50 && title.length <= 150) {
    score += 25
    details.push('Title length is ideal for AI parsing')
  } else if (title.length >= 30 && title.length < 50) {
    score += 15
    fixes.push('Expand title to 50-150 characters for better AI comprehension')
  } else if (title.length > 150) {
    score += 10
    fixes.push('Shorten title to under 150 characters — AI agents truncate long titles')
  } else {
    score += 5
    fixes.push('Title is too short — AI agents need descriptive titles (50-150 chars)')
  }

  // Keyword stuffing detection (too many dashes, pipes, or repeated separators)
  const separatorCount = (title.match(/[-|,\/]/g) || []).length
  if (separatorCount > 4) {
    fixes.push('Remove keyword stuffing — AI agents prefer natural language titles over separator-heavy formats')
  } else {
    score += 15
    details.push('Title uses natural language formatting')
  }

  // Contains brand
  if (product.brand && title.toLowerCase().includes(product.brand.toLowerCase())) {
    score += 10
    details.push('Brand name is included in title')
  } else if (product.brand) {
    fixes.push('Include brand name in title for AI agent brand matching')
  } else {
    score += 5
  }

  // Contains category/product type indicators
  const hasProductType = /shoe|shirt|bag|bottle|watch|earbuds|phone|jacket|pants|dress|hat|ring|cream|serum|supplement|tool|toy|game|book/i.test(title)
  if (hasProductType || product.category) {
    score += 15
    details.push('Product type is identifiable')
  } else {
    score += 5
    fixes.push('Include the product type/category in the title so AI agents can classify it')
  }

  // Contains key variant info (color, size, material)
  const hasVariant = product.color || product.size || /\b(small|medium|large|xl|xxl|\d+\s?oz|\d+\s?ml|\d+\s?inch)\b/i.test(title)
  if (hasVariant) {
    score += 10
    details.push('Variant information present in title')
  } else {
    score += 3
    fixes.push('Add key variant details (color, size, capacity) to title')
  }

  // All caps check
  if (title === title.toUpperCase() && title.length > 10) {
    score = Math.max(score - 10, 0)
    fixes.push('Avoid ALL CAPS — AI agents interpret this as low quality')
  }

  // Special characters overuse
  const specialChars = (title.match(/[!@#$%^&*(){}[\]<>~`]/g) || []).length
  if (specialChars > 2) {
    score = Math.max(score - 5, 0)
    fixes.push('Remove special characters from title — they confuse AI parsers')
  }

  return {
    name: 'Title Quality',
    score: Math.min(score, 75),
    maxScore: 75,
    weight: 0.15,
    details,
    fixes,
  }
}

function scoreDescription(product: ProductData): ScoreDimension {
  const fixes: string[] = []
  const details: string[] = []
  let score = 0
  const desc = product.description.trim()

  // Length check (ideal: 150-1000 chars)
  if (desc.length >= 150 && desc.length <= 1000) {
    score += 20
    details.push('Description length is optimal for AI processing')
  } else if (desc.length >= 80 && desc.length < 150) {
    score += 12
    fixes.push('Expand description to at least 150 characters for thorough AI evaluation')
  } else if (desc.length > 1000) {
    score += 15
    details.push('Description is detailed (consider tightening for clarity)')
  } else if (desc.length > 0) {
    score += 5
    fixes.push('Description is too short — AI agents need 150+ characters to evaluate products')
  } else {
    fixes.push('Add a product description — without one, AI agents cannot recommend your product')
  }

  // Readability: sentence structure
  const sentences = desc.split(/[.!?]+/).filter(s => s.trim().length > 0)
  if (sentences.length >= 3) {
    score += 15
    details.push('Description has good sentence structure')
  } else if (sentences.length >= 1) {
    score += 8
    fixes.push('Add more sentences — AI agents parse multi-sentence descriptions more accurately')
  }

  // Key attributes mentioned
  const attributeKeywords = [
    { pattern: /material|made of|fabric|leather|cotton|polyester|wood|metal|silicone/i, label: 'material' },
    { pattern: /use|perfect for|ideal for|great for|designed for/i, label: 'use case' },
    { pattern: /fit|fits|sizing|true to size|runs large|runs small/i, label: 'fit details' },
    { pattern: /care|wash|clean|maintain|dry clean|machine wash/i, label: 'care instructions' },
    { pattern: /compatible|works with|fits with|pairs with/i, label: 'compatibility' },
    { pattern: /feature|includes|comes with|built-in/i, label: 'features' },
    { pattern: /benefit|helps|improves|reduces|increases|protects/i, label: 'benefits' },
  ]

  let attrCount = 0
  for (const attr of attributeKeywords) {
    if (attr.pattern.test(desc)) {
      attrCount++
    }
  }

  if (attrCount >= 4) {
    score += 20
    details.push(`Description mentions ${attrCount} key attribute types`)
  } else if (attrCount >= 2) {
    score += 12
    const missing = attributeKeywords.filter(a => !a.pattern.test(desc)).map(a => a.label)
    fixes.push(`Add more product attributes: ${missing.slice(0, 3).join(', ')}`)
  } else {
    score += 4
    fixes.push('Description lacks key attributes — add materials, use cases, features, and benefits')
  }

  // HTML/markdown formatting (good for structure)
  const hasFormatting = /<[^>]+>|^[-*•]|\n[-*•]/m.test(desc)
  if (hasFormatting) {
    score += 5
    details.push('Description uses structured formatting')
  }

  // Emoji overuse
  const emojiCount = (desc.match(/[\uD83C-\uDBFF][\uDC00-\uDFFF]/g) || []).length
  if (emojiCount > 5) {
    score = Math.max(score - 5, 0)
    fixes.push('Reduce emoji usage — AI agents parse text more reliably than emoji')
  }

  return {
    name: 'Description AI-Readability',
    score: Math.min(score, 60),
    maxScore: 60,
    weight: 0.20,
    details,
    fixes,
  }
}

function scoreMetadata(product: ProductData): ScoreDimension {
  const fixes: string[] = []
  const details: string[] = []
  let score = 0

  const fields: { key: keyof ProductData; label: string; points: number }[] = [
    { key: 'brand', label: 'Brand', points: 8 },
    { key: 'category', label: 'Category', points: 8 },
    { key: 'materials', label: 'Materials', points: 7 },
    { key: 'dimensions', label: 'Dimensions', points: 5 },
    { key: 'weight', label: 'Weight', points: 5 },
    { key: 'useCases', label: 'Use cases', points: 7 },
    { key: 'careInstructions', label: 'Care instructions', points: 5 },
    { key: 'color', label: 'Color', points: 6 },
    { key: 'size', label: 'Size', points: 6 },
    { key: 'sku', label: 'SKU', points: 4 },
    { key: 'gtin', label: 'GTIN/UPC/EAN', points: 6 },
    { key: 'ingredients', label: 'Ingredients', points: 4 },
    { key: 'compatibility', label: 'Compatibility', points: 4 },
  ]

  for (const field of fields) {
    const value = product[field.key]
    if (value && String(value).trim().length > 0) {
      score += field.points
      details.push(`${field.label} is provided`)
    } else {
      fixes.push(`Add ${field.label.toLowerCase()} — AI agents use this for matching and recommendations`)
    }
  }

  // Images
  if (product.images && product.images.length >= 3) {
    score += 8
    details.push(`${product.images.length} product images provided`)
  } else if (product.images && product.images.length >= 1) {
    score += 4
    fixes.push(`Add more product images (${product.images.length}/3 minimum) — AI agents evaluate visual data`)
  } else {
    fixes.push('Add product images — multimodal AI agents evaluate photos')
  }

  return {
    name: 'Structured Metadata',
    score: Math.min(score, 80),
    maxScore: 80,
    weight: 0.20,
    details,
    fixes,
  }
}

function scoreSchemaReadiness(product: ProductData): ScoreDimension {
  const fixes: string[] = []
  const details: string[] = []
  let score = 0

  // Check fields needed for Schema.org Product markup
  if (product.title) { score += 10; details.push('Name field available') }
  if (product.description) { score += 10; details.push('Description field available') }
  if (product.price) { score += 15; details.push('Price field available for Offer schema') }
  else { fixes.push('Add price — required for Schema.org Offer markup') }
  if (product.currency) { score += 5; details.push('Currency specified') }
  else { fixes.push('Specify currency for Schema.org compliance') }
  if (product.availability) { score += 10; details.push('Availability status available') }
  else { fixes.push('Add availability status (InStock, OutOfStock, PreOrder)') }
  if (product.brand) { score += 5; details.push('Brand available for schema') }
  if (product.images && product.images.length > 0) { score += 5; details.push('Image available for schema') }
  if (product.sku) { score += 5; details.push('SKU available') }
  if (product.gtin) { score += 5; details.push('GTIN available for product identification') }
  else { fixes.push('Add GTIN/UPC/EAN — critical for AI agent product matching') }
  if (product.averageRating && product.reviewCount) {
    score += 10
    details.push('Review data available for AggregateRating schema')
  } else {
    fixes.push('Add review data (rating + count) for AggregateRating schema')
  }

  return {
    name: 'Schema.org Readiness',
    score: Math.min(score, 80),
    maxScore: 80,
    weight: 0.15,
    details,
    fixes,
  }
}

function scorePricingAvailability(product: ProductData): ScoreDimension {
  const fixes: string[] = []
  const details: string[] = []
  let score = 0

  if (product.price && product.price > 0) {
    score += 25
    details.push('Price is set')
  } else {
    fixes.push('Set a product price — AI agents filter out products without clear pricing')
  }

  if (product.currency) {
    score += 10
    details.push('Currency is specified')
  } else {
    fixes.push('Specify currency (USD, EUR, etc.)')
  }

  if (product.availability) {
    score += 20
    details.push(`Availability: ${product.availability}`)
  } else {
    fixes.push('Set availability status — AI agents skip products with unknown stock')
  }

  if (product.shippingTimeline) {
    score += 10
    details.push('Shipping timeline provided')
  } else {
    fixes.push('Add shipping timeline — AI agents compare delivery speed')
  }

  return {
    name: 'Pricing & Availability',
    score: Math.min(score, 65),
    maxScore: 65,
    weight: 0.10,
    details,
    fixes,
  }
}

function scoreReturnPolicy(product: ProductData): ScoreDimension {
  const fixes: string[] = []
  const details: string[] = []
  let score = 0

  if (product.returnPolicy && product.returnPolicy.trim().length > 0) {
    score += 30
    details.push('Return policy is provided')

    if (product.returnPolicy.length >= 50) {
      score += 10
      details.push('Return policy is detailed')
    } else {
      fixes.push('Expand return policy details (conditions, process, exceptions)')
    }
  } else {
    fixes.push('Add a return policy — AI agents deprioritize products without clear return terms')
  }

  if (product.returnWindow) {
    score += 15
    details.push(`Return window: ${product.returnWindow}`)
  } else {
    fixes.push('Specify return window (e.g., "30 days") — AI agents surface this in comparisons')
  }

  return {
    name: 'Return Policy Clarity',
    score: Math.min(score, 55),
    maxScore: 55,
    weight: 0.10,
    details,
    fixes,
  }
}

function scoreReviews(product: ProductData): ScoreDimension {
  const fixes: string[] = []
  const details: string[] = []
  let score = 0

  if (product.reviewCount && product.reviewCount > 0) {
    if (product.reviewCount >= 50) {
      score += 25
      details.push(`Strong review volume (${product.reviewCount} reviews)`)
    } else if (product.reviewCount >= 10) {
      score += 15
      details.push(`${product.reviewCount} reviews`)
      fixes.push('Aim for 50+ reviews — products with more reviews get recommended more')
    } else {
      score += 8
      fixes.push(`Only ${product.reviewCount} reviews — AI agents favor products with 10+ reviews`)
    }
  } else {
    fixes.push('No reviews found — AI agents use reviews as the #1 trust signal')
  }

  if (product.averageRating) {
    if (product.averageRating >= 4.0) {
      score += 25
      details.push(`Excellent rating: ${product.averageRating}/5`)
    } else if (product.averageRating >= 3.5) {
      score += 15
      details.push(`Good rating: ${product.averageRating}/5`)
      fixes.push('Improve rating above 4.0 for stronger AI recommendations')
    } else {
      score += 5
      fixes.push(`Rating ${product.averageRating}/5 is below threshold — AI agents prefer 4.0+`)
    }
  } else {
    fixes.push('No rating data — add average rating for AI agent evaluation')
  }

  return {
    name: 'Review Richness',
    score: Math.min(score, 50),
    maxScore: 50,
    weight: 0.10,
    details,
    fixes,
  }
}

export function calculateVisibilityScore(product: ProductData): VisibilityScore {
  const dimensions = [
    scoreTitle(product),
    scoreDescription(product),
    scoreMetadata(product),
    scoreSchemaReadiness(product),
    scorePricingAvailability(product),
    scoreReturnPolicy(product),
    scoreReviews(product),
  ]

  // Calculate weighted score (normalize each dimension to 0-100 first)
  let weightedSum = 0
  let totalWeight = 0
  for (const dim of dimensions) {
    const normalized = dim.maxScore > 0 ? (dim.score / dim.maxScore) * 100 : 0
    weightedSum += normalized * dim.weight
    totalWeight += dim.weight
  }

  const overall = Math.round(weightedSum / totalWeight)

  let grade: 'A' | 'B' | 'C' | 'D' | 'F'
  let summary: string
  if (overall >= 90) {
    grade = 'A'
    summary = 'Excellent! Your product is highly visible to AI shopping agents.'
  } else if (overall >= 75) {
    grade = 'B'
    summary = 'Good visibility. A few optimizations will make you even more competitive.'
  } else if (overall >= 55) {
    grade = 'C'
    summary = 'Moderate visibility. AI agents can find you but often prefer competitors with better data.'
  } else if (overall >= 35) {
    grade = 'D'
    summary = 'Low visibility. Most AI agents are skipping your products. Immediate fixes needed.'
  } else {
    grade = 'F'
    summary = 'Critical. Your products are essentially invisible to AI shopping agents.'
  }

  return { overall, dimensions, grade, summary }
}
