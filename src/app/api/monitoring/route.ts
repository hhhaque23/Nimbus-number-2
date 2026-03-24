import { NextRequest, NextResponse } from 'next/server'
import { generateMonitoringReport, MonitoringConfig } from '@/lib/monitoring'

export async function POST(request: NextRequest) {
  try {
    const body: MonitoringConfig = await request.json()

    if (!body.storeName) {
      return NextResponse.json(
        { error: 'storeName is required' },
        { status: 400 }
      )
    }

    if (!body.products) {
      body.products = []
    }

    const report = generateMonitoringReport(body)
    return NextResponse.json(report)
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
