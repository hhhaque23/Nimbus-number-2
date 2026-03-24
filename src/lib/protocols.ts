export interface StoreConfig {
  storeUrl: string
  platform: 'shopify' | 'etsy' | 'woocommerce' | 'squarespace' | 'custom' | ''
  hasGoogleMerchantCenter: boolean
  googleMerchantId?: string
  hasStripeIntegration: boolean
  stripeAccountId?: string
  hasStructuredData: boolean
  hasProductFeed: boolean
  productFeedUrl?: string
  hasReturnPolicy: boolean
  hasShippingInfo: boolean
  hasSSL: boolean
  hasRobotsTxt: boolean
  allowsAICrawlers: boolean
  totalProducts: number
  approvedProducts?: number
  hasCheckoutAPI: boolean
  hasInventoryAPI: boolean
}

export interface ProtocolCheck {
  name: string
  passed: boolean
  required: boolean
  description: string
  fixInstructions: string
  estimatedTime: string
}

export interface ProtocolResult {
  protocol: string
  description: string
  status: 'compliant' | 'partial' | 'action_required' | 'not_started'
  score: number
  checks: ProtocolCheck[]
  nextStep: string
  estimatedTimeToComplete: string
}

function computeStatus(score: number): ProtocolResult['status'] {
  if (score === 100) return 'compliant'
  if (score >= 50) return 'partial'
  if (score > 0) return 'action_required'
  return 'not_started'
}

function sumRemainingTime(checks: ProtocolCheck[]): string {
  const timeMap: Record<string, number> = {
    '5 minutes': 5,
    '10 minutes': 10,
    '15 minutes': 15,
    '30 minutes': 30,
    '1 hour': 60,
    '2 hours': 120,
    '3 hours': 180,
    '4 hours': 240,
  }

  let totalMinutes = 0
  for (const check of checks) {
    if (!check.passed) {
      totalMinutes += timeMap[check.estimatedTime] ?? 0
    }
  }

  if (totalMinutes === 0) return '0 minutes'
  if (totalMinutes < 60) return `${totalMinutes} minutes`
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (minutes === 0) return `${hours} hour${hours > 1 ? 's' : ''}`
  return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minutes`
}

function findNextStep(checks: ProtocolCheck[]): string {
  const failedRequired = checks.find((c) => c.required && !c.passed)
  if (failedRequired) return failedRequired.fixInstructions

  const failedOptional = checks.find((c) => !c.required && !c.passed)
  if (failedOptional) return failedOptional.fixInstructions

  return 'All checks passed. Your store is fully compliant.'
}

function calculateScore(checks: ProtocolCheck[]): number {
  const requiredChecks = checks.filter((c) => c.required)
  if (requiredChecks.length === 0) return 100
  const passed = requiredChecks.filter((c) => c.passed).length
  return Math.round((passed / requiredChecks.length) * 100)
}

export function checkGoogleUCP(config: StoreConfig): ProtocolResult {
  const allApproved =
    config.approvedProducts !== undefined &&
    config.totalProducts > 0 &&
    config.approvedProducts >= config.totalProducts

  const checks: ProtocolCheck[] = [
    {
      name: 'Google Merchant Center account',
      passed: config.hasGoogleMerchantCenter,
      required: true,
      description: 'A Google Merchant Center account is required to list products in Google Shopping.',
      fixInstructions: 'Create a Google Merchant Center account at merchants.google.com and link it to your store.',
      estimatedTime: '30 minutes',
    },
    {
      name: 'Product feed active and accessible',
      passed: config.hasProductFeed,
      required: true,
      description: 'An active product feed allows Google to ingest your product catalog.',
      fixInstructions: 'Set up a product feed in Google Merchant Center. Ensure the feed URL is publicly accessible.',
      estimatedTime: '1 hour',
    },
    {
      name: 'All products approved',
      passed: allApproved,
      required: true,
      description: 'All submitted products must be approved in Google Merchant Center.',
      fixInstructions: 'Review disapproved products in Merchant Center and fix policy or data quality issues.',
      estimatedTime: '2 hours',
    },
    {
      name: 'Structured data (Schema.org Product markup)',
      passed: config.hasStructuredData,
      required: true,
      description: 'Schema.org Product markup helps Google understand your product pages.',
      fixInstructions: 'Add JSON-LD structured data with Product schema to all product pages.',
      estimatedTime: '1 hour',
    },
    {
      name: 'SSL certificate',
      passed: config.hasSSL,
      required: true,
      description: 'A valid SSL certificate is required for secure transactions.',
      fixInstructions: 'Install an SSL certificate on your domain. Most hosting providers offer free SSL via Let\'s Encrypt.',
      estimatedTime: '15 minutes',
    },
    {
      name: 'Return policy published',
      passed: config.hasReturnPolicy,
      required: true,
      description: 'A published return policy is required by Google Shopping.',
      fixInstructions: 'Create and publish a return policy page on your store and link it in Merchant Center.',
      estimatedTime: '30 minutes',
    },
    {
      name: 'Shipping information provided',
      passed: config.hasShippingInfo,
      required: true,
      description: 'Shipping rates and delivery estimates must be configured.',
      fixInstructions: 'Configure shipping settings in Google Merchant Center with accurate rates and delivery times.',
      estimatedTime: '30 minutes',
    },
    {
      name: 'Product images meet quality standards',
      passed: config.totalProducts > 0 && config.hasProductFeed,
      required: false,
      description: 'High-quality product images improve visibility and click-through rates.',
      fixInstructions: 'Ensure all product images are at least 800x800px, use white backgrounds, and show the full product.',
      estimatedTime: '3 hours',
    },
    {
      name: 'Inventory data real-time synced',
      passed: config.hasInventoryAPI,
      required: false,
      description: 'Real-time inventory sync prevents overselling and improves buyer experience.',
      fixInstructions: 'Set up Content API for Shopping or configure automatic feed updates for real-time inventory data.',
      estimatedTime: '2 hours',
    },
  ]

  const score = calculateScore(checks)

  return {
    protocol: 'Google UCP',
    description: 'Google Universal Commerce Protocol enables your products to appear across Google surfaces including Shopping, Search, and AI-powered experiences.',
    status: computeStatus(score),
    score,
    checks,
    nextStep: findNextStep(checks),
    estimatedTimeToComplete: sumRemainingTime(checks),
  }
}

export function checkOpenAIACP(config: StoreConfig): ProtocolResult {
  const checks: ProtocolCheck[] = [
    {
      name: 'Stripe integration active',
      passed: config.hasStripeIntegration,
      required: true,
      description: 'Stripe is the required payment processor for OpenAI Agentic Commerce.',
      fixInstructions: 'Create a Stripe account and integrate it with your store. Connect it to your payment processing flow.',
      estimatedTime: '1 hour',
    },
    {
      name: 'Checkout API endpoint available',
      passed: config.hasCheckoutAPI,
      required: true,
      description: 'AI agents need a programmatic checkout endpoint to complete purchases on behalf of users.',
      fixInstructions: 'Implement a checkout API endpoint that accepts product selections and returns a payment session.',
      estimatedTime: '4 hours',
    },
    {
      name: 'Product feed in JSON format accessible',
      passed: config.hasProductFeed,
      required: true,
      description: 'A JSON product feed allows AI agents to browse and search your catalog programmatically.',
      fixInstructions: 'Create a publicly accessible JSON endpoint or file containing your full product catalog.',
      estimatedTime: '2 hours',
    },
    {
      name: 'SSL certificate valid',
      passed: config.hasSSL,
      required: true,
      description: 'SSL is required for secure API communication with AI agents.',
      fixInstructions: 'Install an SSL certificate on your domain. Most hosting providers offer free SSL via Let\'s Encrypt.',
      estimatedTime: '15 minutes',
    },
    {
      name: 'Allows AI crawlers (GPTBot) in robots.txt',
      passed: config.allowsAICrawlers,
      required: true,
      description: 'Your robots.txt must allow GPTBot to crawl product pages.',
      fixInstructions: 'Update your robots.txt to allow GPTBot. Add "User-agent: GPTBot" with "Allow: /" directives.',
      estimatedTime: '5 minutes',
    },
    {
      name: 'Structured product data',
      passed: config.hasStructuredData,
      required: true,
      description: 'Structured data helps AI agents understand product attributes, pricing, and availability.',
      fixInstructions: 'Add JSON-LD structured data with Product schema to all product pages.',
      estimatedTime: '1 hour',
    },
    {
      name: 'Return policy machine-readable',
      passed: config.hasReturnPolicy,
      required: true,
      description: 'AI agents need to communicate return policies to users before purchase.',
      fixInstructions: 'Publish a return policy page and include MerchantReturnPolicy structured data.',
      estimatedTime: '30 minutes',
    },
    {
      name: 'Inventory API for real-time stock checks',
      passed: config.hasInventoryAPI,
      required: false,
      description: 'A real-time inventory API lets AI agents verify stock before completing a purchase.',
      fixInstructions: 'Implement an inventory API endpoint that returns current stock levels by product ID.',
      estimatedTime: '3 hours',
    },
    {
      name: 'Supports programmatic order tracking',
      passed: config.hasCheckoutAPI && config.hasStripeIntegration,
      required: false,
      description: 'Order tracking APIs allow AI agents to provide delivery updates to users.',
      fixInstructions: 'Implement an order status API endpoint that accepts an order ID and returns tracking information.',
      estimatedTime: '4 hours',
    },
  ]

  const score = calculateScore(checks)

  return {
    protocol: 'OpenAI ACP',
    description: 'OpenAI Agentic Commerce Protocol allows AI assistants like ChatGPT to browse, recommend, and purchase products from your store on behalf of users.',
    status: computeStatus(score),
    score,
    checks,
    nextStep: findNextStep(checks),
    estimatedTimeToComplete: sumRemainingTime(checks),
  }
}

export function checkAmazonBuyForMe(config: StoreConfig): ProtocolResult {
  const checks: ProtocolCheck[] = [
    {
      name: 'Products have structured data',
      passed: config.hasStructuredData,
      required: true,
      description: 'Structured data is required for Amazon\'s AI to understand your product catalog.',
      fixInstructions: 'Add JSON-LD structured data with Product schema to all product pages.',
      estimatedTime: '1 hour',
    },
    {
      name: 'Publicly accessible product pages',
      passed: config.hasSSL && config.storeUrl.length > 0,
      required: true,
      description: 'Product pages must be publicly accessible for Amazon\'s agent to browse your store.',
      fixInstructions: 'Ensure all product pages are publicly accessible without login requirements.',
      estimatedTime: '10 minutes',
    },
    {
      name: 'SSL certificate',
      passed: config.hasSSL,
      required: true,
      description: 'A valid SSL certificate is required for secure browsing and transactions.',
      fixInstructions: 'Install an SSL certificate on your domain. Most hosting providers offer free SSL via Let\'s Encrypt.',
      estimatedTime: '15 minutes',
    },
    {
      name: 'Allows AI crawlers in robots.txt',
      passed: config.allowsAICrawlers,
      required: true,
      description: 'Your robots.txt must allow Amazon\'s AI agent to crawl product pages.',
      fixInstructions: 'Update your robots.txt to allow AI crawlers. Ensure you are not blocking automated agents.',
      estimatedTime: '5 minutes',
    },
    {
      name: 'Products have GTIN/UPC identifiers',
      passed: config.hasProductFeed && config.hasStructuredData,
      required: false,
      description: 'GTIN/UPC identifiers help Amazon match your products accurately.',
      fixInstructions: 'Add GTIN or UPC codes to your product data and include them in structured data markup.',
      estimatedTime: '2 hours',
    },
    {
      name: 'Clear pricing on all products',
      passed: config.hasStructuredData,
      required: true,
      description: 'All products must display clear, accurate pricing for the AI agent to communicate to users.',
      fixInstructions: 'Ensure all product pages include visible pricing and Offer structured data with price and currency.',
      estimatedTime: '30 minutes',
    },
    {
      name: 'Shipping information published',
      passed: config.hasShippingInfo,
      required: true,
      description: 'Shipping rates and delivery estimates must be available for the AI agent.',
      fixInstructions: 'Publish shipping rates and estimated delivery times on your store and in structured data.',
      estimatedTime: '30 minutes',
    },
    {
      name: 'Return policy published',
      passed: config.hasReturnPolicy,
      required: true,
      description: 'A clear return policy must be published for buyer confidence.',
      fixInstructions: 'Create and publish a return policy page with clear terms and link it from product pages.',
      estimatedTime: '30 minutes',
    },
    {
      name: 'Product images are high quality',
      passed: config.totalProducts > 0 && config.hasProductFeed,
      required: false,
      description: 'High-quality images help the AI agent present your products effectively to users.',
      fixInstructions: 'Ensure all product images are at least 800x800px with clear, well-lit photos of the product.',
      estimatedTime: '3 hours',
    },
  ]

  const score = calculateScore(checks)

  return {
    protocol: 'Amazon Buy for Me',
    description: 'Amazon Buy for Me allows Amazon\'s AI assistant to purchase products from your store on behalf of Amazon customers.',
    status: computeStatus(score),
    score,
    checks,
    nextStep: findNextStep(checks),
    estimatedTimeToComplete: sumRemainingTime(checks),
  }
}

export function checkAllProtocols(config: StoreConfig): ProtocolResult[] {
  return [
    checkGoogleUCP(config),
    checkOpenAIACP(config),
    checkAmazonBuyForMe(config),
  ]
}
