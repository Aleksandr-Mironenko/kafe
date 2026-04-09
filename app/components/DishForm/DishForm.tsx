'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from './DishForm.module.scss'
import { useRouter } from 'next/navigation'

type FormValues = {
  name: string
  price: number
  weight: string
  ingredients: string
  short_description: string
  full_description: string
  imageFile: FileList
  is_available: boolean
}





const schema = yup.object({
  name: yup.string().required('Название обязательно'),
  price: yup.number().typeError('Введите число').required('Цена обязательна'),
  weight: yup.string().required('Вес обязателен'),
  ingredients: yup.string().required('Ингредиенты обязательны'),
  short_description: yup.string().required('Краткое описание обязательно'),
  full_description: yup.string().required('Полное описание обязательно'),
  is_available: yup.boolean().required(),
  imageFile: yup
    .mixed<FileList>()
    .required('Выберите изображение')
    .test('fileType', 'Допустимые форматы: png, jpeg, svg', (value) => {
      if (!value || value.length === 0) return false
      const allowed = ['image/png', 'image/jpeg', 'image/svg+xml']
      return allowed.includes(value[0].type)
    })
}).required()

export default function DishForm({
  menuId,
  // onSuccess
}: {
  menuId: string
  // onSuccess?: () => void
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      is_available: false
    }
  })

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    setSuccess('')

    try {
      const file = data.imageFile[0]

      const formData = new FormData()
      formData.append('menu_id', menuId)
      formData.append('name', data.name)
      formData.append('price', String(data.price))
      formData.append('weight', data.weight)
      formData.append('ingredients', data.ingredients)
      formData.append('short_description', data.short_description)
      formData.append('full_description', data.full_description)
      formData.append('image', file)
      formData.append('is_available', String(data.is_available))

      const res = await fetch('/api/dishes', {
        method: 'POST',
        body: formData
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Ошибка создания блюда')

      setSuccess('Блюдо создано!')
      reset()
      router.push(`/admin/menu/${menuId}`)
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Ошибка')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input placeholder="Название" {...register('name')} className={styles.input} />
      <p className={styles.error}>{errors.name?.message}</p>

      <input placeholder="Цена (€)" {...register('price')} className={styles.input} />
      <p className={styles.error}>{errors.price?.message}</p>

      <input placeholder="Вес (250г)" {...register('weight')} className={styles.input} />
      <p className={styles.error}>{errors.weight?.message}</p>

      <input placeholder="Ингредиенты" {...register('ingredients')} className={styles.input} />
      <p className={styles.error}>{errors.ingredients?.message}</p>

      <textarea placeholder="Краткое описание" {...register('short_description')} className={styles.textarea} />
      <p className={styles.error}>{errors.short_description?.message}</p>

      <textarea placeholder="Полное описание" {...register('full_description')} className={styles.textarea} />
      <p className={styles.error}>{errors.full_description?.message}</p>
      <label className={styles.checkboxLabel}>
        <input type="checkbox" {...register('is_available')} />
        Доступно к заказу
      </label>

      <input
        type="file"
        {...register('imageFile')}
        accept=".png,.jpeg,.jpg,.svg"
        className={styles.fileInput}
      />
      <p className={styles.error}>{errors.imageFile?.message}</p>

      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? 'Создание...' : 'Создать блюдо'}
      </button>

      {success && <p className={styles.success}>{success}</p>}
    </form>
  )
}