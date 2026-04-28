// 'use client'

// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import styles from './ReviewFormEdit.module.scss'
// import { useRouter } from 'next/navigation'
// import Image from 'next/image'
// import Link from 'next/link'

// type Review = {
//   id: string
//   image_url: string
//   created_at: string
// }

// type FormValues = {
//   files?: FileList
// }

// interface Props {
//   initialData: Review[]
// }

// export default function ReviewFormEdit({
//   initialData
// }: Props) {
//   const router = useRouter()

//   const [loading, setLoading] = useState(false)
//   const [images, setImages] = useState(initialData)
//   const [removedImages, setRemovedImages] = useState<string[]>([])
//   const [success, setSuccess] = useState('')

//   const { register, handleSubmit } = useForm<FormValues>()

//   // ❌ удалить изображение
//   const handleRemoveImage = (url: string) => {
//     setImages(prev => prev.filter(img => img.image_url !== url))
//     setRemovedImages(prev => [...prev, url])
//   }

//   const onSubmit = async (data: FormValues) => {
//     setLoading(true)
//     setSuccess('')

//     try {
//       const formData = new FormData()

//       // ➕ новые файлы
//       if (data.files?.length) {
//         Array.from(data.files).forEach(file => {
//           formData.append('files', file)
//         })
//       }

//       // ❌ удалённые изображения
//       removedImages.forEach(url => {
//         formData.append('removedImages', url)
//       })

//       const res = await fetch('/api/reviews', {
//         method: 'PATCH',
//         body: formData
//       })

//       const result = await res.json()
//       if (!res.ok) throw new Error(result.error || 'Ошибка обновления')

//       setSuccess('Галерея обновлена')
//       setTimeout(() => {
//         router.push('/admin')
//       }, 2000)

//     } catch (err: unknown) {
//       alert(err instanceof Error ? err.message : 'Ошибка')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <>

//       <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
//         <Link href={'/admin'} className={styles.backButton}>
//           ← Назад
//         </Link>
//         <h2 className={styles.title}>Удалить и добавить скриншоты</h2>
//         {/* 🖼 EXISTING IMAGES */}
//         <div className={styles.imagesGrid}>
//           {images.map(img => (
//             <div key={img.id} className={styles.imageItem}>
//               <Image
//                 src={img.image_url}
//                 alt=""
//                 width={120}
//                 height={100}
//                 className={styles.img}
//               />

//               <button
//                 type="button"
//                 onClick={() => handleRemoveImage(img.image_url)}
//                 className={styles.deleteBtn}
//               >
//                 ✕
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* ➕ NEW FILES */}
//         <input
//           type="file"
//           multiple
//           {...register('files')}
//           accept=".png,.jpg,.jpeg,.svg"
//         />

//         <button disabled={loading}>
//           {loading ? 'Сохраняем...' : 'Сохранить'}
//         </button>

//         {success && <p>{success}</p>}
//       </form>
//     </>
//   )
// }

'use client'

import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styles from './ReviewFormEdit.module.scss'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

type Review = {
  id: string
  image_url: string
  created_at: string
}

type FormValues = {
  files?: FileList
}

interface Props {
  initialData: Review[]
}

export default function ReviewFormEdit({ initialData }: Props) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState(initialData)
  const [removedImages, setRemovedImages] = useState<string[]>([])
  const [success, setSuccess] = useState('')

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const { register, handleSubmit } = useForm<FormValues>()

  // 🧹 очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // ❌ удалить изображение
  const handleRemoveImage = (url: string) => {
    setImages(prev => prev.filter(img => img.image_url !== url))
    setRemovedImages(prev => [...prev, url])
  }

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    setSuccess('')

    try {
      const formData = new FormData()

      // ➕ новые файлы
      if (data.files?.length) {
        Array.from(data.files).forEach(file => {
          formData.append('files', file)
        })
      }

      // ❌ удалённые изображения
      removedImages.forEach(url => {
        formData.append('removedImages', url)
      })

      const res = await fetch('/api/reviews', {
        method: 'PATCH',
        body: formData
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Ошибка обновления')

      setSuccess('Галерея обновлена')

      timeoutRef.current = setTimeout(() => {
        router.push('/admin')
      }, 2000)

    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Ошибка')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Link href="/admin" className={styles.backButton}>
        ← Назад
      </Link>

      <h2 className={styles.title}>
        Удалить и добавить скриншоты
      </h2>

      {/* 🖼 EXISTING IMAGES */}
      <div className={styles.imagesGrid}>
        {images.map(img => (
          <div key={img.id} className={styles.imageItem}>
            <Image
              src={img.image_url}
              alt={`review-${img.id}`}
              width={120}
              height={100}
              className={styles.img}
            />

            <button
              type="button"
              onClick={() => handleRemoveImage(img.image_url)}
              className={styles.deleteBtn}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* ➕ NEW FILES */}
      <input
        type="file"
        multiple
        {...register('files')}
        accept=".png,.jpg,.jpeg,.svg"
      />

      <button disabled={loading}>
        {loading ? 'Сохраняем...' : 'Сохранить'}
      </button>

      {success && <p>{success}</p>}
    </form>
  )
}