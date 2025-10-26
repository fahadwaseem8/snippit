import { NextRequest, NextResponse } from 'next/server'
import { withAPILogging } from '@/lib/api-logger'
import { emailService } from '@/lib/email'

export async function GET(request: NextRequest) {
  return withAPILogging(request, async () => {
    try {
      // Send start notification email
      await emailService.sendCronStart('Health Check', {
        triggered_by: 'vercel_cron',
        scheduled_time: '5:00 PM UTC',
        environment: process.env.NODE_ENV || 'development',
      })

      // Verify this is a legitimate cron request from Vercel
      const authHeader = request.headers.get('authorization')
      
      // In production, Vercel automatically adds this header to cron requests
      // For local testing, we'll allow requests without it
      if (process.env.NODE_ENV === 'production') {
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
          // Send error notification for unauthorized access
          await emailService.sendCronError('Health Check - Unauthorized', 'Invalid or missing CRON_SECRET', {
            auth_header_present: !!authHeader,
            expected_secret: !!process.env.CRON_SECRET,
          })
          
          return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
          )
        }
      }

      const cronInfo = {
        type: 'scheduled_health_check',
        timestamp: new Date().toISOString(),
        day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
        scheduled_message: 'Automated daily health check at 5:00 PM UTC',
        server_info: {
          node_version: process.version,
          platform: process.platform,
          memory_usage: process.memoryUsage(),
          uptime: process.uptime(),
        },
      }

      const response = NextResponse.json({
        success: true,
        message: 'Health check completed successfully',
        ...cronInfo,
      })

      // Send completion notification email (fire-and-forget, don't await)
      emailService.sendCronEnd('Health Check', {
        status: 'success',
        response_size: JSON.stringify(cronInfo).length,
        execution_time_ms: Date.now() - new Date(cronInfo.timestamp).getTime(),
        ...cronInfo.server_info,
      }).catch((emailError) => {
        console.error('Failed to send completion email:', emailError)
      })

      return response
    } catch (error) {
      console.error('Cron health check error:', error)
      
      // Send error notification email
      await emailService.sendCronError('Health Check', error as Error, {
        error_type: error instanceof Error ? error.constructor.name : typeof error,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
      })

      return NextResponse.json(
        { error: 'Health check failed' },
        { status: 500 }
      )
    }
  })
}
