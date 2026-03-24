import { ProductData, OptimizedProduct } from './types'

function optimizeTitle(product: ProductData): string {
  const parts: string[] = []

  // Brand first
  if (product.brand) {
    parts.push(product.brand)
  }

  // Clean the original title: remove excessive separators and special chars
  let cleanTitle = product.title
    .replace(/[|]+/g, ' ')
    .replace(/[-]{2,}/g, ' - ')
    .replace(/[!@#$%^&*(){}[\]<>~`]+/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

  // Remove brand from title if already added
  if (product.brand) {
    const brandRegex = new RegExp(`^${escapeRegex(product.brand)}\\s*[-–—]?\\s*`, 'i')
    cleanTitle = cleanTitle.replace(brandRegex, '')
  }

  parts.push(cleanTitle)

  // Add key attributes if not present
  if (product.color && !cleanTitle.toLowerCase().includes(product.color.toLowerCase())) {
    parts.push(`– ${product.color}`)
  }
  if (product.size && !cleanTitle.toLowerCase().includes(product.size.toLowerCase())) {
    parts.push(`– ${product.size}`)
  }
  if (product.materials && !cleanTitle.toLowerCase().includes(product.materials.toLowerCase())) {
    const material = product.materials.split(',')[0].trim()
    if (material.length < 30) {
      parts.push(`– ${material}`)
    }
  }

  let result = parts.join(' ')

  // Ensure not too long
  if (result.length > 150) {
    result = result.substring(0, 147) + '...'
  }

  // Fix casing: title case
  if (result === result.toUpperCase()) {
    result = result.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
  }

  return result
}

function optimizeDescription(product: ProductData): string {
  const sections: string[] = []

  // Opening sentence
  const productName = product.brand ? `${product.brand} ${product.title}` : product.title
  if (product.category) {
    sections.push(`The ${productName} is a ${product.category.toLowerCase()} designed to deliver quality and value.`)
  } else {
    sections.push(`The ${productName} is designed to deliver exceptional quality and value.`)
  }

  // Original description (cleaned)
  if (product.description && product.description.length > 20) {
    let desc = product.description.trim()
    // Remove if it's just the title repeated
    if (desc.toLowerCase() !== product.title.toLowerCase()) {
      sections.push(desc)
    }
  }

  // Materials section
  if (product.materials) {
    sections.push(`Made with ${product.materials.toLowerCase()}, ensuring durability and quality craftsmanship.`)
  }

  // Use cases
  if (product.useCases) {
    sections.push(`Perfect for ${product.useCases.toLowerCase()}.`)
  }

  // Dimensions/weight
  const specs: string[] = []
  if (product.dimensions) specs.push(`Dimensions: ${product.dimensions}`)
  if (product.weight) specs.push(`Weight: ${product.weight}`)
  if (product.size) specs.push(`Size: ${product.size}`)
  if (specs.length > 0) {
    sections.push(`Specifications: ${specs.join('. ')}.`)
  }

  // Care
  if (product.careInstructions) {
    sections.push(`Care: ${product.careInstructions}.`)
  }

  // Compatibility
  if (product.compatibility) {
    sections.push(`Compatible with ${product.compatibility}.`)
  }

  // Shipping & returns
  const policies: string[] = []
  if (product.shippingTimeline) policies.push(`Ships within ${product.shippingTimeline}`)
  if (product.returnWindow) policies.push(`${product.returnWindow} return window`)
  if (policies.length > 0) {
    sections.push(policies.join('. ') + '.')
  }

  return sections.join('\n\n')
}

function generateAttributes(product: ProductData): Record<string, string> {
  const attrs: Record<string, string> = {}

  if (product.brand) attrs['Brand'] = product.brand
  if (product.category) attrs['Category'] = product.category
  if (product.materials) attrs['Materials'] = product.materials
  if (product.color) attrs['Color'] = product.color
  if (product.size) attrs['Size'] = product.size
  if (product.dimensions) attrs['Dimensions'] = product.dimensions
  if (product.weight) attrs['Weight'] = product.weight
  if (product.useCases) attrs['Ideal For'] = product.useCases
  if (product.careInstructions) attrs['Care Instructions'] = product.careInstructions
  if (product.compatibility) attrs['Compatibility'] = product.compatibility
  if (product.ingredients) attrs['Ingredients'] = product.ingredients
  if (product.shippingTimeline) attrs['Shipping'] = product.shippingTimeline
  if (product.returnWindow) attrs['Returns'] = product.returnWindow
  if (product.availability) attrs['Availability'] = product.availability

  // Generate suggested attributes for empty fields
  if (!product.materials) attrs['Materials'] = '[Add materials — e.g., "100% organic cotton"]'
  if (!product.useCases) attrs['Ideal For'] = '[Add use cases — e.g., "everyday wear, outdoor activities"]'
  if (!product.careInstructions) attrs['Care Instructions'] = '[Add care info — e.g., "Machine wash cold, tumble dry low"]'

  return attrs
}

function generateSchemaOrg(product: ProductData): object {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: optimizeTitle(product),
    description: optimizeDescription(product),
  }

  if (product.brand) {
    schema.brand = { '@type': 'Brand', name: product.brand }
  }

  if (product.images && product.images.length > 0) {
    schema.image = product.images
  }

  if (product.sku) schema.sku = product.sku
  if (product.gtin) schema.gtin = product.gtin
  if (product.mpn) schema.mpn = product.mpn
  if (product.color) schema.color = product.color
  if (product.materials) schema.material = product.materials
  if (product.category) schema.category = product.category

  // Offer
  if (product.price) {
    const offer: Record<string, unknown> = {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'USD',
    }

    if (product.availability) {
      const availabilityMap: Record<string, string> = {
        'in stock': 'https://schema.org/InStock',
        'instock': 'https://schema.org/InStock',
        'out of stock': 'https://schema.org/OutOfStock',
        'outofstock': 'https://schema.org/OutOfStock',
        'preorder': 'https://schema.org/PreOrder',
        'pre-order': 'https://schema.org/PreOrder',
      }
      offer.availability = availabilityMap[product.availability.toLowerCase()] || 'https://schema.org/InStock'
    }

    if (product.shippingTimeline) {
      offer.shippingDetails = {
        '@type': 'OfferShippingDetails',
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', value: product.shippingTimeline },
        },
      }
    }

    if (product.returnPolicy) {
      offer.hasMerchantReturnPolicy = {
        '@type': 'MerchantReturnPolicy',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: product.returnWindow || '30',
        returnMethod: 'https://schema.org/ReturnByMail',
      }
    }

    schema.offers = offer
  }

  // Aggregate rating
  if (product.averageRating && product.reviewCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.averageRating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    }
  }

  return schema
}

function findMissingFields(product: ProductData): string[] {
  const missing: string[] = []

  if (!product.brand) missing.push('Brand name')
  if (!product.category) missing.push('Product category')
  if (!product.price) missing.push('Price')
  if (!product.currency) missing.push('Currency')
  if (!product.availability) missing.push('Availability status')
  if (!product.materials) missing.push('Materials / composition')
  if (!product.useCases) missing.push('Use cases / ideal for')
  if (!product.careInstructions) missing.push('Care instructions')
  if (!product.dimensions) missing.push('Product dimensions')
  if (!product.weight) missing.push('Product weight')
  if (!product.shippingTimeline) missing.push('Shipping timeline')
  if (!product.returnPolicy) missing.push('Return policy')
  if (!product.returnWindow) missing.push('Return window')
  if (!product.gtin) missing.push('GTIN / UPC / EAN barcode')
  if (!product.reviewCount) missing.push('Customer reviews')
  if (!product.images || product.images.length === 0) missing.push('Product images')
  if (product.images && product.images.length < 3) missing.push('Additional product images (aim for 3+)')
  if (!product.sizeChart) missing.push('Size chart')
  if (!product.color) missing.push('Color')

  return missing
}

function generateImprovements(product: ProductData): string[] {
  const improvements: string[] = []

  // Title improvements
  if (product.title.length < 50) {
    improvements.push('Title expanded with brand, variant, and category details for AI parsing')
  }
  if (product.title === product.title.toUpperCase()) {
    improvements.push('Title converted from ALL CAPS to proper title case')
  }
  const separators = (product.title.match(/[-|,\/]/g) || []).length
  if (separators > 4) {
    improvements.push('Removed keyword stuffing separators for natural language title')
  }

  // Description improvements
  if (!product.description || product.description.length < 150) {
    improvements.push('Description expanded with structured product information')
  }
  improvements.push('Description restructured with clear sections for AI readability')

  // Metadata improvements
  if (!product.materials) improvements.push('Added materials attribute placeholder')
  if (!product.useCases) improvements.push('Added use cases attribute placeholder')
  if (!product.careInstructions) improvements.push('Added care instructions placeholder')

  // Schema.org
  improvements.push('Generated Schema.org Product + Offer + AggregateRating JSON-LD markup')

  return improvements
}

export function optimizeProduct(product: ProductData): OptimizedProduct {
  return {
    title: optimizeTitle(product),
    description: optimizeDescription(product),
    attributes: generateAttributes(product),
    schemaOrg: generateSchemaOrg(product),
    missingFields: findMissingFields(product),
    improvements: generateImprovements(product),
  }
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
