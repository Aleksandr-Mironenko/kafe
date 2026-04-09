'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from './DishForm.module.scss'
import { useRouter } from 'next/navigation'

// -------------------------
// 1. СХЕМА
// -------------------------
const schema = yup.object({
  name: yup.string().required('Название обязательно'),

  price: yup
    .number()
    .typeError('Введите число')
    .required('Цена обязательна'),

  weight: yup.string().required('Вес обязателен'),

  ingredients: yup.string().required('Ингредиенты обязательны'),

  short_description: yup
    .string()
    .required('Краткое описание обязательно'),

  full_description: yup
    .string()
    .required('Полное описание обязательно'),

  is_available: yup.boolean().default(false),

})

// -------------------------
// 2. ТИП (ФИКС imageFile)
// -------------------------
type FormValues = Omit<yup.InferType<typeof schema>, 'imageFile'> & {
  imageFile?: FileList
}

// -------------------------
// 3. PROPS
// -------------------------
interface Props {
  menuId: string
  dishId: string
  initialData: Partial<FormValues>
  // onSuccess?: () => void
}

// -------------------------
// 4. КОМПОНЕНТ
// -------------------------
export default function DishFormEdit({
  menuId,
  dishId,
  initialData,
  // onSuccess,
}: Props) {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: initialData.name ?? '',
      price: initialData.price ?? 0,
      weight: initialData.weight ?? '',
      ingredients: initialData.ingredients ?? '',
      short_description: initialData.short_description ?? '',
      full_description: initialData.full_description ?? '',
      is_available: initialData.is_available ?? false,
    },
  })

  // -------------------------
  // 5. SUBMIT (PATCH)
  // -------------------------
  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    setSuccess('')

    try {
      const formData = new FormData()

      formData.append('id', dishId)
      formData.append('menu_id', menuId)
      formData.append('name', data.name)
      formData.append('price', String(data.price))
      formData.append('weight', data.weight)
      formData.append('ingredients', data.ingredients)
      formData.append('short_description', data.short_description)
      formData.append('full_description', data.full_description)
      formData.append('is_available', String(data.is_available))

      if (data.imageFile && data.imageFile.length > 0) {
        formData.append('imageFile', data.imageFile[0])
      }

      const res = await fetch('/api/dishes', {
        method: 'PATCH',
        body: formData,
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Ошибка обновления блюда')
      }

      setSuccess('Блюдо успешно обновлено')
      // onSuccess?.()
      router.push(`/admin/menu/${menuId}/dish/${dishId}`)
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Ошибка')
    } finally {
      setLoading(false)
    }
  }

  // -------------------------
  // 6. UI
  // -------------------------
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        {...register('name')}
        placeholder="Название"
        className={styles.input}
      />
      <p className={styles.error}>{errors.name?.message}</p>

      <input
        type="number"
        {...register('price', { valueAsNumber: true })}
        placeholder="Цена (€)"
        className={styles.input}
      />
      <p className={styles.error}>{errors.price?.message}</p>

      <input
        {...register('weight')}
        placeholder="Вес"
        className={styles.input}
      />
      <p className={styles.error}>{errors.weight?.message}</p>

      <input
        {...register('ingredients')}
        placeholder="Ингредиенты"
        className={styles.input}
      />
      <p className={styles.error}>{errors.ingredients?.message}</p>

      <textarea
        {...register('short_description')}
        placeholder="Краткое описание"
        className={styles.textarea}
      />
      <p className={styles.error}>{errors.short_description?.message}</p>

      <textarea
        {...register('full_description')}
        placeholder="Полное описание"
        className={styles.textarea}
      />
      <p className={styles.error}>{errors.full_description?.message}</p>

      <label className={styles.checkboxLabel}>
        <input type="checkbox" {...register('is_available')} />
        Доступно к заказу
      </label>

      <input
        type="file"
        {...register('imageFile')}
        accept=".png,.jpg,.jpeg,.svg"
        className={styles.fileInput}
      />
      <p className={styles.error}>{errors.imageFile?.message}</p>

      <button
        type="submit"
        disabled={loading}
        className={styles.button}
      >
        {loading ? 'Сохранение...' : 'Сохранить изменения'}
      </button>

      {success && <p className={styles.success}>{success}</p>}
    </form>
  )
}