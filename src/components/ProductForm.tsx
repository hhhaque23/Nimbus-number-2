'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { ProductData } from '@/lib/types'

interface ProductFormProps {
  onSubmit: (product: ProductData) => void
  loading?: boolean
  initialData?: ProductData
}

const SAMPLE_PRODUCTS: { label: string; data: ProductData }[] = [
  {
    label: 'Well-optimized: Trail Running Shoe',
    data: {
      title: 'TrailMaster Pro Waterproof Trail Running Shoe',
      description: 'Engineered for rugged terrain and wet conditions, the TrailMaster Pro features a Vibram Megagrip outsole with 5mm lugs for superior traction on mud, rock, and loose gravel. The waterproof Gore-Tex membrane keeps feet dry while the breathable mesh upper prevents overheating. A responsive EVA midsole with 8mm drop provides cushioned support for long-distance trail runs. Reinforced toe cap protects against rock strikes.',
      price: 139.99,
      currency: 'USD',
      availability: 'In Stock',
      brand: 'TrailMaster',
      category: 'Trail Running Shoes',
      materials: 'Gore-Tex waterproof membrane, Vibram Megagrip rubber outsole, breathable mesh upper, EVA midsole',
      dimensions: '12 x 5 x 5 inches',
      weight: '10.2 oz',
      useCases: 'trail running, hiking, obstacle course racing, wet weather running',
      careInstructions: 'Remove insoles after wet runs. Air dry away from direct heat. Clean with soft brush and mild soap.',
      color: 'Blue/Black',
      size: 'Men\'s 10',
      sku: 'TM-PRO-BB-10',
      gtin: '0123456789012',
      returnPolicy: 'Full refund within 60 days. Shoes must be in original condition with tags attached. Free return shipping included.',
      returnWindow: '60 days',
      shippingTimeline: '2-3 business days',
      reviewCount: 234,
      averageRating: 4.6,
      images: ['front.jpg', 'side.jpg', 'sole.jpg', 'lifestyle.jpg'],
    },
  },
  {
    label: 'Needs work: Generic T-Shirt',
    data: {
      title: 'MENS TEE SHIRT COTTON - BLUE - LARGE - BEST PRICE!!!',
      description: 'Nice blue t-shirt for men. Very comfortable. Buy now!',
      price: 19.99,
      brand: '',
      category: '',
      materials: '',
      color: 'Blue',
      size: 'Large',
    },
  },
  {
    label: 'Poor: Minimal listing',
    data: {
      title: 'Candle',
      description: 'Smells good.',
    },
  },
]

export default function ProductForm({ onSubmit, loading, initialData }: ProductFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [product, setProduct] = useState<ProductData>(initialData || {
    title: '',
    description: '',
  })

  const update = (field: keyof ProductData, value: string | number | string[]) => {
    setProduct(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(product)
  }

  const loadSample = (data: ProductData) => {
    setProduct(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sample products */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Try a sample product:</label>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PRODUCTS.map((sample) => (
            <button
              key={sample.label}
              type="button"
              onClick={() => loadSample(sample.data)}
              className="text-xs px-3 py-1.5 rounded-full glass glass-hover text-gray-300"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Required fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Product Title *</label>
          <input
            type="text"
            value={product.title}
            onChange={e => update('title', e.target.value)}
            placeholder="e.g., Men's Trail Running Shoe – Blue – Size 10"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Product Description *</label>
          <textarea
            value={product.description}
            onChange={e => update('description', e.target.value)}
            placeholder="Describe your product in detail: materials, features, benefits, use cases..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
            <input
              type="number"
              step="0.01"
              value={product.price || ''}
              onChange={e => update('price', parseFloat(e.target.value) || 0)}
              placeholder="29.99"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Currency</label>
            <select
              value={product.currency || ''}
              onChange={e => update('currency', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="" className="bg-gray-900">Select</option>
              <option value="USD" className="bg-gray-900">USD</option>
              <option value="EUR" className="bg-gray-900">EUR</option>
              <option value="GBP" className="bg-gray-900">GBP</option>
              <option value="CAD" className="bg-gray-900">CAD</option>
              <option value="AUD" className="bg-gray-900">AUD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Availability</label>
            <select
              value={product.availability || ''}
              onChange={e => update('availability', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="" className="bg-gray-900">Select</option>
              <option value="In Stock" className="bg-gray-900">In Stock</option>
              <option value="Out of Stock" className="bg-gray-900">Out of Stock</option>
              <option value="Pre-order" className="bg-gray-900">Pre-order</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Brand</label>
            <input
              type="text"
              value={product.brand || ''}
              onChange={e => update('brand', e.target.value)}
              placeholder="e.g., Nike, Patagonia"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
            <input
              type="text"
              value={product.category || ''}
              onChange={e => update('category', e.target.value)}
              placeholder="e.g., Running Shoes, Kitchen Appliances"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Advanced fields toggle */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
      >
        {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        {showAdvanced ? 'Hide' : 'Show'} advanced fields ({showAdvanced ? 'fewer' : 'more'} = higher score)
      </button>

      {showAdvanced && (
        <div className="space-y-4 pl-4 border-l-2 border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Materials</label>
              <input
                type="text"
                value={product.materials || ''}
                onChange={e => update('materials', e.target.value)}
                placeholder="e.g., 100% organic cotton"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Color</label>
              <input
                type="text"
                value={product.color || ''}
                onChange={e => update('color', e.target.value)}
                placeholder="e.g., Midnight Blue"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Size</label>
              <input
                type="text"
                value={product.size || ''}
                onChange={e => update('size', e.target.value)}
                placeholder="e.g., Large, 10, 32x30"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Weight</label>
              <input
                type="text"
                value={product.weight || ''}
                onChange={e => update('weight', e.target.value)}
                placeholder="e.g., 10.2 oz, 500g"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Dimensions</label>
              <input
                type="text"
                value={product.dimensions || ''}
                onChange={e => update('dimensions', e.target.value)}
                placeholder="e.g., 12 x 8 x 4 inches"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">SKU</label>
              <input
                type="text"
                value={product.sku || ''}
                onChange={e => update('sku', e.target.value)}
                placeholder="e.g., PROD-001"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Use Cases</label>
            <input
              type="text"
              value={product.useCases || ''}
              onChange={e => update('useCases', e.target.value)}
              placeholder="e.g., trail running, hiking, outdoor activities"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Care Instructions</label>
            <input
              type="text"
              value={product.careInstructions || ''}
              onChange={e => update('careInstructions', e.target.value)}
              placeholder="e.g., Machine wash cold, tumble dry low"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">GTIN / UPC / EAN</label>
            <input
              type="text"
              value={product.gtin || ''}
              onChange={e => update('gtin', e.target.value)}
              placeholder="e.g., 0123456789012"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Shipping Timeline</label>
              <input
                type="text"
                value={product.shippingTimeline || ''}
                onChange={e => update('shippingTimeline', e.target.value)}
                placeholder="e.g., 2-3 business days"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Return Window</label>
              <input
                type="text"
                value={product.returnWindow || ''}
                onChange={e => update('returnWindow', e.target.value)}
                placeholder="e.g., 30 days"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Return Policy</label>
            <textarea
              value={product.returnPolicy || ''}
              onChange={e => update('returnPolicy', e.target.value)}
              placeholder="e.g., Full refund within 30 days. Items must be unused with original packaging."
              rows={2}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Average Rating (1-5)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={product.averageRating || ''}
                onChange={e => update('averageRating', parseFloat(e.target.value) || 0)}
                placeholder="4.5"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Review Count</label>
              <input
                type="number"
                value={product.reviewCount || ''}
                onChange={e => update('reviewCount', parseInt(e.target.value) || 0)}
                placeholder="42"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || !product.title}
          className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing...' : 'Score My Product'}
        </button>
      </div>
    </form>
  )
}
