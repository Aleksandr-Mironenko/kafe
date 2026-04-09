'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from './MenuFormEdit.module.scss'
import { useRouter } from 'next/navigation'

type FormValues = {
  name: string
  description: string
  imageFile?: FileList
  is_available: boolean
}

const schema = yup.object({
  name: yup.string().required('Название меню обязательно'),
  description: yup.string().required('Описание обязательно'),
  is_available: yup.boolean().default(false),
  imageFile: yup
    .mixed<FileList>()
    .notRequired()
    .test('fileType', 'Допустимые форматы: svg, png, jpeg, jpg', (value) => {
      if (!value || value.length === 0) return true
      const allowed = ['image/png', 'image/jpeg', 'image/svg+xml']
      return allowed.includes(value[0].type)
    })
}).required()

interface Props {
  menuId: string
  initialData: FormValues
}

export default function MenuFormEdit({ menuId, initialData }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialData
  })

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    setSuccess('')

    try {
      const formData = new FormData()
      formData.append('id', menuId)
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('is_available', String(data.is_available))

      if (data.imageFile && data.imageFile.length > 0) {
        formData.append('image', data.imageFile[0])
      }

      const res = await fetch(`/api/menus?id=${menuId}`, {
        method: 'PATCH',
        body: formData
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Ошибка обновления меню')

      setSuccess('Меню успешно обновлено!')
      router.push('/admin')
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Неизвестная ошибка')
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
        {loading ? 'Сохранение...' : 'Сохранить изменения'}
      </button>

      {success && <p className={styles.success}>{success}</p>}
    </form>
  )
}