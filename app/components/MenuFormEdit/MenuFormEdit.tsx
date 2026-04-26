// 'use client'
// import { Resolver } from 'react-hook-form'
// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
// import * as yup from 'yup'
// import styles from './ServiceFormEdit.module.scss'
// import { useRouter } from 'next/navigation'
// import Image from 'next/image'

// type ExistingImage = {
//   id: string
//   url: string
// }

// type FormValues = {
//   name: string
//   description: string
//   full_description: string
//   is_available: boolean
//   files?: FileList
// }

// const schema = yup.object({
//   name: yup.string().required('Название обязательно'),
//   description: yup.string().required('Описание обязательно'),
//   full_description: yup.string().required('Полное описание обязательно'),
//   is_available: yup.boolean().default(false),

// }).required()

// interface Props {
//   serviceId: string
//   initialData: {
//     name: string
//     description: string
//     full_description: string
//     is_available: boolean
//   }
//   initialImages: ExistingImage[]
// }

// export default function ServiceFormEdit({
//   serviceId,
//   initialData,
//   initialImages
// }: Props) {
//   const resolver = yupResolver(schema) as Resolver<FormValues>
//   const router = useRouter()

//   const [loading, setLoading] = useState(false)
//   const [images, setImages] = useState(initialImages)
//   const [removedImages, setRemovedImages] = useState<string[]>([])
//   const [success, setSuccess] = useState('')

//   const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
//     resolver, // ✅ ИЗМЕНЕНИЕ
//     defaultValues: {
//       ...initialData,
//     }
//   })

//   // ❌ удалить старое изображение
//   const handleRemoveImage = (id: string) => {
//     setImages(prev => prev.filter(img => img.id !== id))
//     setRemovedImages(prev => [...prev, id])
//   }

//   const onSubmit = async (data: FormValues) => {
//     setLoading(true)
//     setSuccess('')

//     try {
//       const formData = new FormData()

//       formData.append('id', serviceId)
//       formData.append('name', data.name)
//       formData.append('description', data.description)
//       formData.append('full_description', data.full_description)
//       formData.append('is_available', String(data.is_available))

//       // ➕ новые файлы
//       if (data.files?.length) {
//         Array.from(data.files).forEach(file => {
//           formData.append('files', file)
//         })
//       }

//       // ❌ удалённые изображения
//       removedImages.forEach(id => {
//         formData.append('removedImages', id)
//       })

//       const res = await fetch('/api/services', {
//         method: 'PATCH',
//         body: formData
//       })

//       const result = await res.json()
//       if (!res.ok) throw new Error(result.error || 'Ошибка обновления')

//       setSuccess('Сервис обновлён')
//       router.push('/admin')

//     } catch (err: unknown) {
//       alert(err instanceof Error ? err.message : 'Ошибка')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

//       <input {...register('name')} placeholder="Название" />
//       <p>{errors.name?.message}</p>

//       <textarea {...register('description')} placeholder="Описание" />
//       <p>{errors.description?.message}</p>

//       <textarea {...register('full_description')} placeholder="Полное описание" />
//       <p>{errors.full_description?.message}</p>

//       <label>
//         <input type="checkbox" {...register('is_available')} />
//         Активен
//       </label>

//       {/* 🖼 EXISTING IMAGES */}
//       <div className={styles.imagesGrid}>
//         {images.map(img => (
//           <div key={img.id} className={styles.imageItem}>
//             <Image
//               src={img.url}
//               alt=""
//               width={120}
//               height={100}
//               className={styles.img}
//             />

//             <button
//               type="button"
//               onClick={() => handleRemoveImage(img.id)}
//               className={styles.deleteBtn}
//             >
//               ✕
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* ➕ NEW FILES */}
//       <input
//         type="file"
//         multiple
//         {...register('files')}
//         accept=".png,.jpg,.jpeg,.svg"
//       />

//       <button disabled={loading}>
//         {loading ? 'Сохраняем...' : 'Сохранить'}
//       </button>

//       {success && <p>{success}</p>}
//     </form>
//   )
// }






// 'use client'
// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
// import * as yup from 'yup'
// import styles from './MenuFormEdit.module.scss'
// import { useRouter } from 'next/navigation'

// type FormValues = {
//   name: string
//   description: string
//   imageFile?: FileList
//   is_available: boolean
// }

// const schema = yup.object({
//   name: yup.string().required('Название меню обязательно'),
//   description: yup.string().required('Описание обязательно'),
//   is_available: yup.boolean().default(false),

// }).required()

// interface Props {
//   menuId: string
//   initialData: FormValues
// }

// export default function MenuFormEdit({ menuId, initialData }: Props) {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [success, setSuccess] = useState('')

//   const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
//     resolver: yupResolver(schema),
//     defaultValues: initialData
//   })

//   const onSubmit = async (data: FormValues) => {
//     setLoading(true)
//     setSuccess('')

//     try {
//       const formData = new FormData()
//       formData.append('id', menuId)
//       formData.append('name', data.name)
//       formData.append('description', data.description)
//       formData.append('is_available', String(data.is_available))

//       if (data.imageFile && data.imageFile.length > 0) {
//         formData.append('image', data.imageFile[0])
//       }

//       const res = await fetch(`/api/menus?id=${menuId}`, {
//         method: 'PATCH',
//         body: formData
//       })

//       const result = await res.json()
//       if (!res.ok) throw new Error(result.error || 'Ошибка обновления меню')

//       setSuccess('Меню успешно обновлено!')
//       router.push('/admin')
//     } catch (err: unknown) {
//       alert(err instanceof Error ? err.message : 'Неизвестная ошибка')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
//       <div>
//         <label className={styles.label}>Название</label>
//         <input type="text" {...register('name')} className={styles.input} />
//         <p className={styles.error}>{errors.name?.message}</p>
//       </div>

//       <div>
//         <label className={styles.label}>Описание</label>
//         <textarea {...register('description')} className={styles.textarea} />
//         <p className={styles.error}>{errors.description?.message}</p>
//       </div>

//       <label className={styles.toggleSwitch}>
//         <input type="checkbox" {...register('is_available')} />
//         <span className={styles.slider}></span>
//       </label>

//       <div>
//         <label className={styles.label}>Изображение</label>
//         <input
//           type="file"
//           {...register('imageFile')}
//           accept=".svg,.png,.jpeg,.jpg"
//           className={styles.fileInput}
//         />
//         <p className={styles.error}>{errors.imageFile?.message}</p>
//       </div>

//       <button type="submit" disabled={loading} className={styles.button}>
//         {loading ? 'Сохранение...' : 'Сохранить изменения'}
//       </button>

//       {success && <p className={styles.success}>{success}</p>}
//     </form>
//   )
// }


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