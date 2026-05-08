import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData()

    const id = formData.get('id')
    const slugRaw = formData.get('slug')
    console.log("id", id)
    console.log("slug", slugRaw)
    if (typeof id !== 'string') {
      return NextResponse.json({ error: 'Menu ID required' }, { status: 400 })
    }

    if (typeof slugRaw !== 'string') {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    let slug: string[]

    try {
      const parsed = JSON.parse(slugRaw)
      if (!Array.isArray(parsed)) {
        throw new Error()
      }
      slug = parsed.map(String)
    } catch {
      return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('menus')
      .update({ slugs: slug })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ menu: data }, { status: 200 })

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}