import { NextRequest, NextResponse } from 'next/server'
import { checkAllProtocols } from '@/lib/protocols'
import { StoreConfig } from '@/lib/protocols'

export async function POST(request: NextRequest) {
  try {
    const body: StoreConfig = await request.json()

    if (!body.storeUrl) {
      return NextResponse.json(
        { error: 'Store URL is required' },
        { status: 400 }
      )
    }

    const results = checkAllProtocols(body)
    return NextResponse.json(results)
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
