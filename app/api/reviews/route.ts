import { NextRequest, NextResponse } from 'next/server'
import { getReviews, updateReview } from '@/services/reviewsServise'

// 📌 GET — получить галерею
export async function GET() {
  try {
    const reviews = await getReviews()

    return NextResponse.json({ reviews }, { status: 200 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'

    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}

// 📌 PATCH — обновить галерею (добавить/удалить картинки)
export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData()

    const removedImages = formData.getAll('removedImages') as string[]

    const files = formData
      .getAll('files')
      .filter((file): file is File => file instanceof File)

    const updated = await updateReview({
      files,
      removedImages,
    })

    return NextResponse.json(
      { reviews: updated },
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