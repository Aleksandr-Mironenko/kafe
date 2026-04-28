import { supabase } from '@/lib/supabaseClient'

// Получить все отзывы
export const getReviews = async () => {
  const { data, error } = await supabase
    .from('reviews_image')
    .select(`
      id,
      image_url,
      created_at
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data

}

// // создаём отзыв
// export const createReview = async ({
//   files
// }: {
//   files?: File[]
// }) => {

//   if (files?.length) {
//     await Promise.all(
//       files.map(async (file) => {
//         const fileName = `${Date.now()}-${crypto.randomUUID()}-${file.name}`

//         const { error: uploadError } = await supabase.storage
//           .from('review_images')
//           .upload(fileName, file)

//         if (uploadError) throw uploadError

//         const { data } = supabase.storage
//           .from('review_images')
//           .getPublicUrl(fileName)

//         const { error: insertError } = await supabase
//           .from('review_images')
//           .insert({
//             image_url: data.publicUrl
//           })

//         if (insertError) throw insertError
//       })
//     )
//   }

//   return await getReviews()
// }

// обновить отзывы
export const updateReview = async (
  updates: {
    files?: File[]
    removedImages?: string[]
  }) => {

  const { files, removedImages } = updates


  if (removedImages?.length) {
    const fileNames = removedImages
      .map(url => new URL(url).pathname.split('/').pop())
      .filter((name): name is string => Boolean(name))

    if (fileNames.length) {
      const { error } = await supabase.storage
        .from('reviews_image')
        .remove(fileNames)

      if (error) throw error
    }

    const { error } = await supabase
      .from('reviews_image')
      .delete()
      .in('image_url', removedImages)

    if (error) throw error
  }

  // 3. upload new files
  if (files?.length) {
    await Promise.all(
      files.map(async (file) => {
        const fileName = `${Date.now()}-${crypto.randomUUID()}-${file.name}`

        const { error: uploadError } = await supabase.storage
          .from('reviews_image')
          .upload(fileName, file)

        if (uploadError) throw uploadError

        const { data } = supabase.storage
          .from('reviews_image')
          .getPublicUrl(fileName)

        const { error: insertError } = await supabase
          .from('reviews_image')
          .insert({
            image_url: data.publicUrl
          })

        if (insertError) throw insertError
      })
    )
  }

  // 4. final fetch
  const data = await getReviews()
  return data
}

//удалить раздел мы не можем тк он есть на сайте мы можем его только менть