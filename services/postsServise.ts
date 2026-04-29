import { supabase } from '@/lib/supabaseClient'
import cyrillicToTranslit from 'cyrillic-to-translit-js'

// Тип поста
export type Post = {
  id: string
  name: string
  header: string
  full_description?: string
  sort_order: number
  is_available: boolean
  created_at: string
  url_name: string
}

export const getPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const getPostById = async (id: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const getPostByUrlName = async (url_name: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('url_name', url_name)
    .single()

  if (error) throw error

  return data
}

export const createPost = async ({
  name,
  header,
  full_description,

  sort_order = 0,
  is_available = true
}: {
  name: string
  header: string
  full_description?: string
  sort_order?: number
  is_available?: boolean
}) => {


  const url_name = cyrillicToTranslit()
    .transform(name)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // убрать спецсимволы
    .trim()
    .replace(/\s+/g, '-')

  const { data, error } = await supabase
    .from('posts')
    .insert({
      name,
      header,
      full_description,
      url_name,
      sort_order,
      is_available
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export const updatePost = async (
  id: string,
  updates: {
    url_name?: string
    name?: string
    header?: string
    full_description?: string
    sort_order?: number
    is_available?: boolean
  }
) => {

  // Если обновляется name → пересоздаём url_name
  if (updates.name) {
    const url_name = cyrillicToTranslit()
      .transform(updates.name)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-')

    updates.url_name = url_name
  }

  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deletePost = async (id: string) => {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) throw error

  return true
}
