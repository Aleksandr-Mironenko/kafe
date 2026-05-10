import { supabase } from '@/lib/supabaseClient'
import cyrillicToTranslit from 'cyrillic-to-translit-js'

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
  slug: string[]
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


export async function searchDishes(query: string): Promise<Dish[]> {
  if (!query.trim()) return []

  const { data: dishesByName, error: nameError } = await supabase
    .from("dishes")
    .select(`*`)
    .ilike("name", `%${query}%`)
    .eq("is_available", true)
    .limit(10)

  if (nameError) {
    throw nameError
  }


  const { data: dishesByIngredients, error: ingredientError } =
    await supabase
      .from("dishes")
      .select(`*`)
      .ilike("ingredients", `%${query}%`)
      .eq("is_available", true)
      .limit(10)

  if (ingredientError) {
    throw ingredientError
  }

  // ---------------------------
  // 3. Объединение без дублей
  // ---------------------------
  const uniqueMap = new Map<string, Dish>()

  dishesByName?.forEach((dish) => {
    uniqueMap.set(dish.id, dish)
  })

  dishesByIngredients?.forEach((dish) => {
    if (!uniqueMap.has(dish.id)) {
      uniqueMap.set(dish.id, dish)
    }
  })

  return Array.from(uniqueMap.values())
}
// export const getDishesBySlug = async (slug: string, menu_ids: string[]) => {
//   if (!menu_ids.length) return []

//   const { data, error } = await supabase
//     .from('dishes')
//     .select('*')
//     .contains('slugs', [slug]) // ← исправлено
//     .in('menu_id', menu_ids)

//   if (error) throw error

//   const grouped = data.reduce((acc, dish) => {
//     const key = `${dish.menu_id}-${dish.price}`

//     if (!acc[key]) acc[key] = []
//     acc[key].push(dish)

//     return acc
//   }, {} as Record<string, Dish[]>)

//   return grouped
// }

export const getDishesBySlug = async (slug: string, menu_ids: string[]) => {
  if (!menu_ids.length) return []

  const { data, error } = await supabase
    .from('dishes')
    .select('*')
    .contains('slugs', [slug])
    .in('menu_id', menu_ids)

  if (error) throw error

  return data // ← просто массив
}


// Получить блюдо по URL
export const getDishByUrl = async (url_name: string) => {
  const { data, error } = await supabase
    .from('dishes')
    .select('*')
    .eq('url_name', url_name)
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

  const url_name = cyrillicToTranslit()
    .transform(name)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // убрать спецсимволы
    .trim()
    .replace(/\s+/g, '-')


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
      url_name,
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
    slug?: string[]
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
      ...(updates.slug !== undefined ? { slug: updates.slug } : {}),
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