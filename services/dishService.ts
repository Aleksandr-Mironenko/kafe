import { supabase } from '@/lib/supabaseClient'

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

// Получить блюда
export const getDishes = async (menuId: string) => {
  const { data, error } = await supabase
    .from('dishes')
    .select('*')
    .eq('menu_id', menuId)
    .order('order_index', { ascending: true })

  if (error) throw error
  return data
}

// Получить блюдо по ID
export const getDishById = async (id: string) => {
  const { data, error } = await supabase
    .from('dishes')
    .select('*')
    .eq('id', id)
    .single()  // возвращает один объект

  if (error) throw error
  return data
}

// Создать блюдо (🔥 аналог createMenu)
export const createDish = async ({
  menu_id,
  name,
  ingredients,
  short_description,
  full_description,
  weight,
  price,
  file,
  is_available,
}: {
  menu_id: string
  name: string
  ingredients?: string
  short_description?: string
  full_description?: string
  weight?: string
  price?: number
  file?: File | null
  is_available?: boolean
}) => {
  let imageUrl = ''

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer())

    const fileName = `${Date.now()}-${file.name}`

    const { error: uploadError } = await supabase.storage
      .from('dish-images')
      .upload(fileName, buffer, {
        contentType: file.type
      })

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('dish-images')
      .getPublicUrl(fileName)

    imageUrl = data.publicUrl
  }

  const { data, error } = await supabase
    .from('dishes')
    .insert({
      menu_id,
      name,
      ingredients: ingredients || '',
      short_description: short_description || '',
      full_description: full_description || '',
      weight: weight || '',
      price: price || 0,
      image_url: imageUrl,
      is_available: is_available ?? false
    })
    .select()
    .single()

  if (error) throw error

  return data
}

// Обновить блюдо
export const updateDish = async (
  id: string,
  updates: {
    menu_id: string
    name: string
    ingredients?: string
    short_description?: string
    full_description?: string
    weight?: string
    price?: number
    file?: File | null
    is_available?: boolean
  }
) => {
  let imageUrl: string | undefined

  const { file, ...rest } = updates

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${Date.now()}-${file.name}`

    const { error: uploadError } = await supabase.storage
      .from('dish-images')
      .upload(fileName, buffer, {
        contentType: file.type,
      })

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('dish-images')
      .getPublicUrl(fileName)

    imageUrl = data.publicUrl
  }

  const { data, error } = await supabase
    .from('dishes')
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


// смена чекбокса видимости блюда
export const updateToggleDish = async (is_available: boolean, id: string) => {
  const { data, error } = await supabase
    .from('dishes')
    .update({ is_available })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}


// Удалить блюдо
export const deleteDish = async (id: string) => {
  const { error } = await supabase
    .from('dishes')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}