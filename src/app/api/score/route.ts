import { NextRequest, NextResponse } from 'next/server'
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

    if (!body.description && body.description !== '') {
      body.description = ''
    }

    const score = calculateVisibilityScore(body)
    return NextResponse.json(score)
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
