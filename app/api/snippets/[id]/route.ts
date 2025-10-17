import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { withAPILogging } from '@/lib/api-logger'

// PATCH /api/snippets/[id] - Update snippet
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAPILogging(request, async () => {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const { id } = await params
      const body = await request.json()
      const { title, language, code, is_favorite } = body

      // Build update object with only provided fields
      const updateData: Record<string, unknown> = {}
      if (title !== undefined) updateData.title = title
      if (language !== undefined) updateData.language = language
      if (code !== undefined) updateData.code = code
      if (is_favorite !== undefined) updateData.is_favorite = is_favorite

      if (Object.keys(updateData).length === 0) {
        return NextResponse.json(
          { error: 'No fields to update' },
          { status: 400 }
        )
      }

      const { data, error } = await supabase
        .from('snippets')
        .update(updateData)
        .eq('id', id)
        .eq('owner_id', user.id)
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      if (!data) {
        return NextResponse.json({ error: 'Snippet not found' }, { status: 404 })
      }

      return NextResponse.json({ snippet: data })
    } catch (error) {
      console.error('Update snippet error:', error)
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      )
    }
  })
}

// DELETE /api/snippets/[id] - Delete snippet
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAPILogging(request, async () => {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const { id } = await params

      const { error } = await supabase
        .from('snippets')
        .delete()
        .eq('id', id)
        .eq('owner_id', user.id)

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Delete snippet error:', error)
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      )
    }
  })
}
