import { NextResponse } from 'next/server'

export async function GET() {
  // Debug endpoint to check environment variables (be careful with this in production!)
  const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
  const hasServiceRole = !!process.env.SUPABASE_SERVICE_ROLE_KEY
  const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  // Mask the actual values for security
  const urlPreview = process.env.NEXT_PUBLIC_SUPABASE_URL 
    ? process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 30) + '...'
    : 'NOT SET'
  
  return NextResponse.json({
    environment: process.env.NODE_ENV,
    checks: {
      NEXT_PUBLIC_SUPABASE_URL: hasSupabaseUrl ? '✓ Set' : '✗ Missing',
      SUPABASE_SERVICE_ROLE_KEY: hasServiceRole ? '✓ Set' : '✗ Missing',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: hasAnonKey ? '✓ Set' : '✗ Missing',
    },
    supabase_url_preview: urlPreview,
    note: 'Delete this endpoint after debugging!',
  })
}
