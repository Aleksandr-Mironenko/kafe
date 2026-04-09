import { NextRequest, NextResponse } from 'next/server'
import { updateToggleMenu } from '@/services/menuServise'

export async function PATCH(req: NextRequest) {
  try {
    const { id, is_available } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'Menu ID required' }, { status: 400 })
    }

    const data = await updateToggleMenu(is_available, id)

    return NextResponse.json({ menu: data }, { status: 200 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}