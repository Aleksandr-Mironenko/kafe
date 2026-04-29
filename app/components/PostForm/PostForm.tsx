'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from './PostForm.module.scss'
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
  sort_order: yup.number().typeError('Введите число').default(0),
  is_available: yup.boolean().default(false),
}).required()

export default function PostForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
      defaultValues: {
        is_available: false,
        sort_order: 0
      }
    })

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    setSuccess('')

    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('header', data.header)
      formData.append('full_description', data.full_description)
      formData.append('sort_order', String(data.sort_order))
      formData.append('is_available', String(data.is_available))

      const res = await fetch('/api/posts', {
        method: 'POST',
        body: formData
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Ошибка создания поста')

      setSuccess('Пост успешно создан!')
      reset()
      router.push('/admin')

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Неизвестная ошибка'
      alert(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

      <div>
        <label className={styles.label}>Название</label>
        <input type="text" {...register('name')} className={styles.input} />
        <p className={styles.error}>{errors.name?.message}</p>
      </div>

      <div>
        <label className={styles.label}>Заголовок</label>
        <textarea {...register('header')} className={styles.textarea} />
        <p className={styles.error}>{errors.header?.message}</p>
      </div>

      <div>
        <label className={styles.label}>Полное описание</label>
        <textarea {...register('full_description')} className={styles.textarea} />
        <p className={styles.error}>{errors.full_description?.message}</p>
      </div>

      <div>
        <label className={styles.label}>Порядок сортировки</label>
        <input type="number" {...register('sort_order')} className={styles.input} />
        <p className={styles.error}>{errors.sort_order?.message}</p>
      </div>

      <label className={styles.toggleSwitch}>
        <input type="checkbox" {...register('is_available')} />
        <span className={styles.slider}></span>
      </label>

      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? 'Создание...' : 'Создать пост'}
      </button>

      {success && <p className={styles.success}>{success}</p>}
    </form>
  )
}
