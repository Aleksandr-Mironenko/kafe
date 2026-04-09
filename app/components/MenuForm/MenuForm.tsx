'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from './MenuForm.module.scss'
import { useRouter } from 'next/navigation'


type FormValues = {
  name: string
  description: string
  imageFile: FileList
  is_available: boolean

}

const schema = yup.object({
  name: yup.string().required('Название меню обязательно'),
  description: yup.string().required('Описание обязательно'),
  is_available: yup.boolean().default(false),
  imageFile: yup
    .mixed<FileList>()
    .required('Выберите изображение')
    .test('fileType', 'Допустимые форматы: svg, png, jpeg, jpg', (value: FileList | undefined) => {
      if (!value || value.length === 0) return false
      const allowed = ['image/png', 'image/jpeg', 'image/svg+xml']
      return allowed.includes(value[0].type)
    })
}).required()

export default function MenuForm(
  // { onSuccess }: { onSuccess?: () => void }
) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
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
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('image', file)
      formData.append('is_available', String(data.is_available))

      const res = await fetch('/api/menus', {
        method: 'POST',
        body: formData
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Ошибка создания меню')

      setSuccess('Меню успешно создано!')
      reset()
      // onSuccess?.()
      router.push(`/admin`)

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
        <label className={styles.label}>Описание</label>
        <textarea {...register('description')} className={styles.textarea} />
        <p className={styles.error}>{errors.description?.message}</p>
      </div>

      <label className={styles.toggleSwitch}>
        <input type="checkbox" {...register('is_available')} />
        <span className={styles.slider}></span>
      </label>

      <div>
        <label className={styles.label}>Изображение</label>
        <input
          type="file"
          {...register('imageFile')}
          accept=".svg,.png,.jpeg,.jpg"
          className={styles.fileInput}
        />
        <p className={styles.error}>{errors.imageFile?.message}</p>
      </div>

      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? 'Создание...' : 'Создать меню'}
      </button>

      {success && <p className={styles.success}>{success}</p>}
    </form>
  )
}