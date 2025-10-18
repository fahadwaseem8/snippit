import { NextRequest, NextResponse } from 'next/server'
import { withAPILogging } from '@/lib/api-logger'

export async function POST(request: NextRequest) {
  return withAPILogging(request, async () => {
    try {
      // Extract visitor information from request body
      // The withAPILogging middleware automatically captures:
      // - IP address
      // - User agent
      // - Headers (including referer)
      // - Request body (page, screen_resolution, language, timezone, etc.)
      
      await request.json() // Parse body for logging
      
      return NextResponse.json({
        success: true,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Health check error:', error)
      return NextResponse.json(
        { error: 'Failed to log visit' },
        { status: 500 }
      )
    }
  })
}

export async function GET(request: NextRequest) {
  return withAPILogging(request, async () => {
    // Simple health check endpoint
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'Snippit API',
    })
  })
}
