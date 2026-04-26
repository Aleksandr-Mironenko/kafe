import { supabase } from '@/lib/supabaseClient'
import cyrillicToTranslit from 'cyrillic-to-translit-js'

export type Image = {
  id: number
  service_id: number
  image_url: string
}

// Получить все сервисы
export const getServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select(`
      id,
      name,
      url_name,
      description,
      full_description,
      is_available,
      created_at,
      service_images (
        image_url
      )
    `)
    .order('created_at', { ascending: false })

  if (error) throw error

  return data.map(service => {
    const { service_images, ...rest } = service

    return {
      ...rest,
      images: (service_images ?? []).map(img => img.image_url) || []
    }
  })
}

// получить сервис по его id
export const getServiceById = async (id: number) => {
  const { data, error } = await supabase
    .from('services')
    .select(`
      id,
      name,
      description,
      full_description,
      is_available,
      created_at,
      service_images (
        image_url
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error

  return {
    ...data,
    images: (data.service_images ?? []).map(img => img.image_url) || []
  }
}

// получить сервис по его url_name
export const getServiceByUrlName = async (url_name: string) => {
  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      service_images (
        image_url
      )
    `)
    .eq('url_name', url_name)
    .single()

  if (error) throw error

  return {
    ...data,
    images: (data.service_images ?? []).map((i: Image) => i.image_url) || []
  }
}

// 1. создаём сервис

export const createService = async ({
  name,
  description,
  full_description,
  is_available = true,
  files
}: {
  name: string
  description?: string
  full_description?: string
  is_available?: boolean
  files?: File[]
}) => {

  //url
  const url_name = cyrillicToTranslit()
    .transform(name)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // убрать спецсимволы
    .trim()
    .replace(/\s+/g, '-')

  // 1. создаём сервис
  const { data: service, error: serviceError } = await supabase
    .from('services')
    .insert({
      name,
      url_name,
      description,
      full_description,
      is_available,
    })
    .select()
    .single()

  if (serviceError) throw serviceError

  const service_id = service.id as number

  // const imageUrl = ''

  // 2. если есть файл — грузим в storage
  // if (files) {
  //   const buffer = Buffer.from(await file.arrayBuffer())
  //   const fileName = `${Date.now()}-${file.name}`

  //   const { error: uploadError } = await supabase.storage
  //     .from('service-images')
  //     .upload(fileName, buffer, {
  //       contentType: file.type
  //     })

  //   if (uploadError) throw uploadError

  //   const { data } = supabase.storage
  //     .from('service-images')
  //     .getPublicUrl(fileName)

  //   imageUrl = data.publicUrl

  //   // 3. сохраняем связь в БД
  //   const { error: imageError } = await supabase
  //     .from('service_images')
  //     .insert({
  //       service_id,
  //       image_url: imageUrl
  //     })

  //   if (imageError) throw imageError
  // }


  if (files?.length) {
    // for (const file of files) {
    //   const buffer = Buffer.from(await file.arrayBuffer())
    //   const fileName = `${Date.now()}-${file.name}`

    //   const { error: uploadError } = await supabase.storage
    //     .from('service-images')
    //     .upload(fileName, buffer)

    //   if (uploadError) throw uploadError

    //   const { data } = supabase.storage
    //     .from('service-images')
    //     .getPublicUrl(fileName)

    //   await supabase.from('service_images').insert({
    //     service_id,
    //     image_url: data.publicUrl
    //   })
    // }
    await Promise.all(
      files.map(async (file) => {
        const fileName = `${Date.now()}-${crypto.randomUUID()}-${file.name}`

        const { error: uploadError } = await supabase.storage
          .from('service_images')
          .upload(fileName, file)

        if (uploadError) throw uploadError

        const { data } = supabase.storage
          .from('service_images')
          .getPublicUrl(fileName)

        return supabase.from('service_images').insert({
          service_id,
          image_url: data.publicUrl
        })
      })
    )
  }



  return await getServiceById(service.id)
}

/// обновить 1 сервис
export const updateService = async (id: number, updates: {
  name?: string
  url_name?: string
  description?: string
  full_description?: string
  is_available?: boolean
  files?: File[]
  removedImages?: string[]
}) => {

  const { files, removedImages, ...rest } = updates

  // 1. update service
  if (Object.keys(rest).length > 0) {
    const { error } = await supabase
      .from('services')
      .update(rest)
      .eq('id', id)

    if (error) throw error
  }

  // 2. delete images
  if (removedImages?.length) {
    const fileNames = removedImages
      .map(url => new URL(url).pathname.split('/').pop())
      .filter((name): name is string => Boolean(name))

    if (fileNames.length) {
      const { error } = await supabase.storage
        .from('service_images')
        .remove(fileNames)

      if (error) throw error
    }

    const { error } = await supabase
      .from('service_images')
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
          .from('service_images')
          .upload(fileName, file)

        if (uploadError) throw uploadError

        const { data } = supabase.storage
          .from('service_images')
          .getPublicUrl(fileName)

        const { error: insertError } = await supabase
          .from('service_images')
          .insert({
            service_id: id,
            image_url: data.publicUrl
          })

        if (insertError) throw insertError
      })
    )
  }

  // 4. final fetch
  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      service_images (image_url)
    `)
    .eq('id', id)
    .single()

  if (error) throw error

  return {
    ...data,
    images: (data.service_images ?? []).map((i: Image) => i.image_url)
  }
}

// Удалить сервис
export const deleteService = async (id: number) => {

  // 1. получаем картинки
  const { data: images, error: fetchError } = await supabase
    .from('service_images')
    .select('image_url')
    .eq('service_id', id)

  if (fetchError) throw fetchError

  // 2. удаляем файлы из storage
  if (images?.length) {
    const fileNames = images
      .map(img => {
        const url = new URL(img.image_url)
        return url.pathname.split('/').pop()
      })
      .filter((name): name is string => Boolean(name))

    await supabase.storage
      .from('service_images')
      .remove(fileNames)
  }

  // 3. удаляем сервис (и каскадно service_images)
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)

  if (error) throw error

  return true
}