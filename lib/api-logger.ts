import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Validate environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create client if we have valid credentials
const supabaseAdmin = SUPABASE_URL && SUPABASE_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        fetch: fetch.bind(globalThis), // Ensure proper fetch binding
      },
    })
  : null

interface LogData {
  ip_address: string
  user_agent: string
  method: string
  url: string
  headers: Record<string, string>
  query_params: Record<string, string | string[]>
  body?: unknown
  response_body?: unknown
  response_status: number
  response_time: number
}

export async function logRequest(data: LogData) {
  try {
    // Validate Supabase client
    if (!supabaseAdmin) {
      console.error('Supabase client not initialized. Check environment variables:')
      console.error('NEXT_PUBLIC_SUPABASE_URL:', SUPABASE_URL ? '✓ Set' : '✗ Missing')
      console.error('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✓ Set' : '✗ Missing')
      console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing')
      return
    }

    console.log('Logging request to Supabase:', {
      url: data.url,
      method: data.method,
      ip: data.ip_address,
      supabase_url: SUPABASE_URL,
    })

    const { error } = await supabaseAdmin
      .from('request_logs')
      .insert({
        ip_address: data.ip_address,
        user_agent: data.user_agent,
        method: data.method,
        url: data.url,
        headers: data.headers,
        query_params: data.query_params,
        body: data.body,
        response_body: data.response_body,
        response_status: data.response_status,
        response_time: data.response_time,
      })

    if (error) {
      console.error('Failed to log request:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })
    } else {
      console.log('✓ Successfully logged request to Supabase')
    }
  } catch (error) {
    console.error('Exception while logging request:', {
      error,
      errorType: typeof error,
      errorMessage: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
  }
}

export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

export function extractHeaders(request: NextRequest): Record<string, string> {
  const headers: Record<string, string> = {}
  request.headers.forEach((value, key) => {
    // Skip sensitive headers
    if (!['authorization', 'cookie'].includes(key.toLowerCase())) {
      headers[key] = value
    }
  })
  return headers
}

export function extractQueryParams(request: NextRequest): Record<string, string | string[]> {
  const params: Record<string, string | string[]> = {}
  const searchParams = request.nextUrl.searchParams
  
  searchParams.forEach((value, key) => {
    const existing = params[key]
    if (existing) {
      params[key] = Array.isArray(existing) ? [...existing, value] : [existing, value]
    } else {
      params[key] = value
    }
  })
  
  return params
}

export async function withAPILogging(
  request: NextRequest,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  const startTime = Date.now()
  
  // Extract request data
  const ip = getClientIP(request)
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const method = request.method
  const url = request.nextUrl.pathname
  const headers = extractHeaders(request)
  const queryParams = extractQueryParams(request)
  
  let body: unknown
  try {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      const clonedRequest = request.clone()
      body = await clonedRequest.json()
    }
  } catch {
    body = null
  }

  // Execute the actual handler
  let response: NextResponse
  let responseBody: unknown
  let responseStatus: number

  try {
    response = await handler()
    responseStatus = response.status
    
    // Try to extract response body
    try {
      const clonedResponse = response.clone()
      const text = await clonedResponse.text()
      if (text) {
        responseBody = JSON.parse(text)
      }
    } catch {
      responseBody = null
    }
  } catch (error) {
    responseStatus = 500
    responseBody = { error: 'Internal server error' }
    console.error('Handler error:', error)
    response = NextResponse.json(responseBody, { status: responseStatus })
  }

  const responseTime = Date.now() - startTime

  // Log asynchronously (don't wait)
  logRequest({
    ip_address: ip,
    user_agent: userAgent,
    method,
    url,
    headers,
    query_params: queryParams,
    body,
    response_body: responseBody,
    response_status: responseStatus,
    response_time: responseTime,
  }).catch((err) => console.error('Async log error:', err))

  return response
}
