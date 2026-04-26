import { NextRequest, NextResponse } from 'next/server'
import { createService, updateService, deleteService } from '@/services/servicesServise'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const full_description = formData.get('full_description') as string
    // const files = formData.getAll('files') as File[]
    const files = formData.getAll('files').filter(
      (file): file is File => file instanceof File
    )
    const is_available = formData.get('is_available') === 'true'

    const service = await createService({
      name,
      description,
      full_description,
      files,
      is_available,
    })

    return NextResponse.json({ service }, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
type UpdatePayload = {
  name?: string
  description?: string
  full_description?: string
  is_available?: boolean
  files?: File[]
}

export async function PATCH(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type')

    if (contentType?.includes('application/json')) {
      const { id, is_available }: { id: number; is_available: boolean } = await req.json()

      if (!id) {
        return NextResponse.json({ error: 'Service ID required' }, { status: 400 })
      }

      const updated = await updateService(id, {
        is_available,
      })

      return NextResponse.json({ service: updated }, { status: 200 })
    }

    const updates: UpdatePayload = {}
    const formData = await req.formData()
    const removedImages = formData.getAll('removedImages') as string[]
    const id = Number(formData.get('id'))
    // const id = formData.get('id')
    if (!id || Number.isNaN(id)) {
      return NextResponse.json(
        { error: 'Service ID required' },
        { status: 400 }
      )
    }


    const name = formData.get('name')
    if (typeof name === 'string') updates.name = name

    const description = formData.get('description')
    if (typeof description === 'string') updates.description = description

    const full_description = formData.get('full_description')
    if (typeof full_description === 'string') updates.full_description = full_description

    const is_available = formData.get('is_available')
    if (typeof is_available === 'string') {
      updates.is_available = is_available === 'true'
    }

    const files = formData
      .getAll('files')
      .filter((file): file is File => file instanceof File)

    const updated = await updateService(id, {
      ...updates,
      files,
      removedImages
    })

    return NextResponse.json(
      { service: updated },
      { status: 200 }
    )

  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Unknown error'

    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')


    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 })
    }

    await deleteService(Number(id))

    return NextResponse.json({ message: 'Service deleted' }, { status: 200 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}