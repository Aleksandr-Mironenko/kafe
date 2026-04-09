// app/api/dishes/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createDish, deleteDish, updateDish } from '@/services/dishService'

export type Dish = {
  id: string
  menu_id: string
  name: string
  ingredients?: string
  short_description?: string
  full_description?: string
  weight?: string
  price?: number
  image_url?: string
  order_index?: number
  is_available?: boolean
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const dish = await createDish({
      menu_id: formData.get('menu_id') as string,
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      weight: formData.get('weight') as string,
      ingredients: formData.get('ingredients') as string,
      short_description: formData.get('short_description') as string,
      full_description: formData.get('full_description') as string,
      file: formData.get('image') as File,
      is_available: formData.get('is_available') === 'true'
    })

    return NextResponse.json({ dish }, { status: 201 })
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
      return NextResponse.json({ error: 'Dish ID required' }, { status: 400 })
    }

    const updates = {

      menu_id: formData.get('menu_id') as string,
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      weight: formData.get('weight') as string,
      ingredients: formData.get('ingredients') as string,
      short_description: formData.get('short_description') as string,
      full_description: formData.get('full_description') as string,
      is_available: formData.get('is_available') === 'true',
    }

    const file = formData.get('imageFile') as File | null

    const updated = await updateDish(id, {
      ...updates,
      file: file ?? undefined,
    })

    return NextResponse.json({ dish: updated }, { status: 200 })
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
      return NextResponse.json({ error: 'Dish ID is required' }, { status: 400 })
    }

    await deleteDish(id)

    return NextResponse.json({ message: 'Dish deleted' }, { status: 200 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}