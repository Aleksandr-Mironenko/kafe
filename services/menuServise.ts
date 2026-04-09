import { supabase } from '@/lib/supabaseClient'

// Получить все меню
export const getMenus = async () => {
  const { data, error } = await supabase
    .from('menus')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// получить менб по его id

export const getMenuById = async (id: string) => {
  const { data, error } = await supabase
    .from('menus')
    .select('*')
    .eq('id', id)
    .single() // возвращает один объект

  if (error) throw error
  return data
}

// Создать меню (🔥 тут всё: upload + insert)
export const createMenu = async ({
  name,
  description,
  file
}: {
  name: string
  description?: string
  file?: File | null
}) => {
  let imageUrl = ''

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer())

    const fileName = `${Date.now()}-${file.name}`

    const { error: uploadError } = await supabase.storage
      .from('menu-images')
      .upload(fileName, buffer, {
        contentType: file.type
      })

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('menu-images')
      .getPublicUrl(fileName)

    imageUrl = data.publicUrl
  }

  const { data, error } = await supabase
    .from('menus')
    .insert({
      name,
      description: description || '',
      image_url: imageUrl
    })
    .select()
    .single()

  if (error) throw error

  return data
}

// обновить 1 меню
export const updateMenu = async (
  id: string,
  updates: { name: string; description: string; is_available?: boolean; file?: File }
) => {
  let imageUrl: string | undefined
  const { file, ...rest } = updates

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${Date.now()}-${file.name}`

    const { error: uploadError } = await supabase.storage
      .from('menu-images')
      .upload(fileName, buffer, { contentType: file.type })

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('menu-images')
      .getPublicUrl(fileName)

    imageUrl = data.publicUrl
  }

  const { data, error } = await supabase
    .from('menus')
    .update({
      ...rest,
      ...(imageUrl ? { image_url: imageUrl } : {}),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

//смена видимости меню
export const updateToggleMenu = async (is_available: boolean, id: string) => {
  const { data, error } = await supabase
    .from('menus')
    .update({ is_available })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}


// Удалить меню
export const deleteMenu = async (id: string) => {
  const { error } = await supabase
    .from('menus')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}