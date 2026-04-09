import { NextRequest, NextResponse } from 'next/server'
import { createMenu, updateMenu, deleteMenu } from '@/services/menuServise'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const file = formData.get('image') as File | null

    const menu = await createMenu({
      name,
      description,
      file
    })

    return NextResponse.json({ menu }, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData()

    const id = formData.get('id') as string
    if (!id) {
      return NextResponse.json({ error: 'Menu ID required' }, { status: 400 })
    }

    const updates = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      is_available: formData.get('is_available') === 'true',
    }

    const file = formData.get('imageFile') as File | null

    const updated = await updateMenu(id, {
      ...updates,
      file: file ?? undefined,
    })

    return NextResponse.json({ menu: updated }, { status: 200 })
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
      return NextResponse.json({ error: 'Menu ID is required' }, { status: 400 })
    }

    await deleteMenu(id)

    return NextResponse.json({ message: 'Menu deleted' }, { status: 200 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}