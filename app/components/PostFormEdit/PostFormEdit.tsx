'use client'

import { Resolver } from 'react-hook-form'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from './PostFormEdit.module.scss'
import { useRouter } from 'next/navigation'

type FormValues = {
  name: string
  header: string
  full_description: string
  sort_order: number
  is_available: boolean
}

const schema = yup.object({
  name: yup.string().required('Название обязательно'),
  header: yup.string().required('Заголовок обязателен'),
  full_description: yup.string().required('Полное описание обязательно'),
  sort_order: yup.number().typeError('Введите число').required('Порядок обязателен'),
  is_available: yup.boolean().default(false),
}).required()

interface InitialData {
  id: string
  name: string
  header: string
  full_description: string
  sort_order: number
  is_available: boolean
  created_at: string
  url_name: string
}

interface Props {
  postId: string
  initialData: InitialData
}

export default function PostFormEdit({ postId, initialData }: Props) {
  const resolver = yupResolver(schema) as Resolver<FormValues>
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver,
    defaultValues: {
      name: initialData.name,
      header: initialData.header,
      full_description: initialData.full_description,
      sort_order: initialData.sort_order,
      is_available: initialData.is_available,
    }
  })

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    setSuccess('')

    try {
      const res = await fetch('/api/posts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: postId,
          ...data
        })
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Ошибка обновления')

      setSuccess('Пост обновлён')
      router.push('/admin')

    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Ошибка')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

      <label>Название</label>
      <input {...register('name')} />
      <p className={styles.error}>{errors.name?.message}</p>

      <label>Заголовок</label>
      <textarea {...register('header')} />
      <p className={styles.error}>{errors.header?.message}</p>

      <label>Полное описание</label>
      <textarea {...register('full_description')} />
      <p className={styles.error}>{errors.full_description?.message}</p>

      <label>Порядок сортировки</label>
      <input type="number" {...register('sort_order')} />
      <p className={styles.error}>{errors.sort_order?.message}</p>

      <label className={styles.checkbox}>
        <input type="checkbox" {...register('is_available')} />
        Активен
      </label>

      <button disabled={loading}>
        {loading ? 'Сохраняем...' : 'Сохранить'}
      </button>

      {success && <p className={styles.success}>{success}</p>}
    </form>
  )
}
