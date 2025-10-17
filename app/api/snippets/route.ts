import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { withAPILogging } from '@/lib/api-logger'

// GET /api/snippets - List snippets with pagination and search
export async function GET(request: NextRequest) {
  return withAPILogging(request, async () => {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const searchParams = request.nextUrl.searchParams
      const page = parseInt(searchParams.get('page') || '1')
      const limit = parseInt(searchParams.get('limit') || '10')
      const search = searchParams.get('search') || ''
      const language = searchParams.get('language') || ''
      const favorites = searchParams.get('favorites') === 'true'

      const offset = (page - 1) * limit

      let query = supabase
        .from('snippets')
        .select('*', { count: 'exact' })
        .eq('owner_id', user.id)
        .order('updated_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (favorites) {
        query = query.eq('is_favorite', true)
      }

      if (search) {
        query = query.or(`title.ilike.%${search}%,code.ilike.%${search}%`)
      }

      if (language) {
        query = query.eq('language', language)
      }

      const { data, error, count } = await query

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json({
        snippets: data,
        total: count,
        page,
        limit,
        hasMore: offset + limit < (count || 0),
      })
    } catch (error) {
      console.error('List snippets error:', error)
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      )
    }
  })
}

// POST /api/snippets - Create new snippet
export async function POST(request: NextRequest) {
  return withAPILogging(request, async () => {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const { title, language, code, is_favorite } = await request.json()

      if (!title || !code) {
        return NextResponse.json(
          { error: 'Title and code are required' },
          { status: 400 }
        )
      }

      const { data, error } = await supabase
        .from('snippets')
        .insert({
          title,
          language: language || 'plaintext',
          code,
          is_favorite: is_favorite || false,
          owner_id: user.id,
        })
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json({ snippet: data }, { status: 201 })
    } catch (error) {
      console.error('Create snippet error:', error)
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      )
    }
  })
}
