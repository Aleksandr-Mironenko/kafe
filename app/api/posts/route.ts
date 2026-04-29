import { NextRequest, NextResponse } from 'next/server'
import { createPost, updatePost, deletePost } from '@/services/postsServise'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const name = formData.get('name') as string
    const header = formData.get('header') as string
    const full_description = formData.get('full_description') as string | null
    const sort_order = Number(formData.get('sort_order') ?? 0)
    const is_available = formData.get('is_available') === 'true'

    const post = await createPost({
      name,
      header,
      full_description: full_description || undefined,
      sort_order,
      is_available,

    })

    return NextResponse.json({ post }, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


type UpdatePayload = {
  name?: string
  header?: string
  full_description?: string
  sort_order?: number
  is_available?: boolean
}

export async function PATCH(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type')

    // --- JSON запрос ---
    if (contentType?.includes('application/json')) {
      const { id, ...updates }: { id: string } & UpdatePayload = await req.json()

      if (!id) {
        return NextResponse.json({ error: 'Post ID required' }, { status: 400 })
      }

      const updated = await updatePost(id, updates)

      return NextResponse.json({ post: updated }, { status: 200 })
    }

    // --- formData запрос ---
    const formData = await req.formData()
    const id = formData.get('id') as string

    if (!id) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 })
    }

    const updates: UpdatePayload = {}

    const name = formData.get('name')
    if (typeof name === 'string') updates.name = name

    const header = formData.get('header')
    if (typeof header === 'string') updates.header = header

    const full_description = formData.get('full_description')
    if (typeof full_description === 'string') updates.full_description = full_description

    const sort_order = formData.get('sort_order')
    if (typeof sort_order === 'string') updates.sort_order = Number(sort_order)

    const is_available = formData.get('is_available')
    if (typeof is_available === 'string') {
      updates.is_available = is_available === 'true'
    }

    const updated = await updatePost(id, updates)

    return NextResponse.json({ post: updated }, { status: 200 })

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
    }

    await deletePost(id)

    return NextResponse.json({ message: 'Post deleted' }, { status: 200 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
