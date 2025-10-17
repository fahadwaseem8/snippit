import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { withAPILogging } from '@/lib/api-logger'

export async function POST(request: NextRequest) {
  return withAPILogging(request, async () => {
    try {
      const supabase = await createClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        await supabase.auth.signOut()
      }

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Logout error:', error)
      return NextResponse.json(
        { error: 'Logout failed' },
        { status: 500 }
      )
    }
  })
}
