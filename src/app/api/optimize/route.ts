import { NextRequest, NextResponse } from 'next/server'
import { optimizeProduct } from '@/lib/optimizer'
import { calculateVisibilityScore } from '@/lib/scorer'
import { ProductData } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body: ProductData = await request.json()

    if (!body.title) {
      return NextResponse.json(
        { error: 'Product title is required' },
        { status: 400 }
      )
    }

    if (!body.description) {
      body.description = ''
    }

    const beforeScore = calculateVisibilityScore(body)
    const optimized = optimizeProduct(body)

    // Score the optimized version
    const optimizedProduct: ProductData = {
      ...body,
      title: optimized.title,
      description: optimized.description,
    }
    const afterScore = calculateVisibilityScore(optimizedProduct)

    return NextResponse.json({
      original: {
        title: body.title,
        description: body.description,
        score: beforeScore,
      },
      optimized: {
        ...optimized,
        score: afterScore,
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
