import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { withAPILogging } from '@/lib/api-logger'

export async function POST(request: NextRequest) {
  return withAPILogging(request, async () => {
    try {
      const { email, password } = await request.json()

      if (!email || !password) {
        return NextResponse.json(
          { error: 'Email and password are required' },
          { status: 400 }
        )
      }

      if (password.length < 6) {
        return NextResponse.json(
          { error: 'Password must be at least 6 characters' },
          { status: 400 }
        )
      }

      const supabase = await createClient()
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        )
      }

      // Only return success status, no user data
      return NextResponse.json({
        success: true,
        message: 'Registration successful. Please check your email to confirm your account.',
      })
    } catch (error) {
      console.error('Register error:', error)
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      )
    }
  })
}
