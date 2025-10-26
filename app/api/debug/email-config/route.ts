import { NextResponse } from 'next/server'

export async function GET() {
  const emailConfig = {
    smtp_host: process.env.SMTP_HOST ? 'SET' : 'NOT SET',
    smtp_port: process.env.SMTP_PORT ? 'SET' : 'NOT SET',
    smtp_secure: process.env.SMTP_SECURE ? 'SET' : 'NOT SET',
    smtp_user: process.env.SMTP_USER ? 'SET' : 'NOT SET',
    smtp_pass: process.env.SMTP_PASS ? 'SET' : 'NOT SET',
    smtp_from: process.env.SMTP_FROM ? 'SET' : 'NOT SET',
    cron_notification_email: process.env.CRON_NOTIFICATION_EMAIL ? 'SET' : 'NOT SET',
    cron_notification_email_value: process.env.CRON_NOTIFICATION_EMAIL || 'NOT SET',
  }

  return NextResponse.json({
    message: 'Email configuration status',
    config: emailConfig,
    timestamp: new Date().toISOString(),
  })
}