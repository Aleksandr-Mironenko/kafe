'use client'
import { Resolver } from 'react-hook-form'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from './ServiceFormEdit.module.scss'
import { useRouter } from 'next/navigation'
import Image from 'next/image'



type FormValues = {
  name: string
  description: string
  full_description: string
  is_available: boolean
  files?: FileList
}

const schema = yup.object({
  name: yup.string().required('Название обязательно'),
  description: yup.string().required('Описание обязательно'),
  full_description: yup.string().required('Полное описание обязательно'),
  is_available: yup.boolean().default(false),

}).required()
interface InitialData {
  id: number
  name: string
  description: string
  full_description: string
  is_available: boolean
  create_at: string
  url_name: string
  images: string[]
  slugs: string[]

}
type Menu = {
  url_name: string;
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  created_at: string | null;
  is_available: boolean
  slugs: string[]
}
interface Props {
  serviceId: string
  initialData: InitialData
  menus: Menu[]
  id: string

}
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
  slugs: string[]
}

export default function ServiceFormEdit({
  serviceId,
  initialData,
  menus,
  id
}: Props) {
  const resolver = yupResolver(schema) as Resolver<FormValues>
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState(initialData.images)
  const [removedImages, setRemovedImages] = useState<string[]>([])
  const [success, setSuccess] = useState('')
  const [editDishesInMenu, setEditDishesInMenu] = useState<Dish[]>([])
  const [openDish, setOpenDish] = useState<boolean>(false)

  const [menusState, setMenusState] = useState<Menu[]>(menus)
  const [ativeMenuName, setAtiveMenuName] = useState<string>('')


  const menu = menusState.map(el => {
    // console.log(89, Array.isArray(el.slug) && el.slug.map(String).includes(String(id)))
    // console.log(90, Array.isArray(el.slug))
    // console.log(91, el.slug)
    console.log(92, editDishesInMenu)
    console.log(93)
    console.log(94)
    return (
      <li key={el.id} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
        <label className={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={
              Array.isArray(el.slugs) &&
              el.slugs.map(String).includes(String(id))

            }

            onClick={(e) => e.stopPropagation()}
            onChange={async (e) => {
              const newValue = e.target.checked

              try {
                const currentSlug = Array.isArray(el.slugs) ? el.slugs.map(String) : []

                const updatedSlug = (newValue)
                  ? [...new Set([...currentSlug, id])]
                  : (
                    editDishesInMenu?.[0]?.menu_id === el.id && setEditDishesInMenu([]),
                    currentSlug.filter((i) => i !== String(id))
                  )

                // локально обновляем ТОЛЬКО этот элемент
                setMenusState(prev =>
                  prev.map(item =>
                    item.id === el.id
                      ? { ...item, slugs: updatedSlug }
                      : item
                  )
                )

                const formData = new FormData()
                formData.append('id', String(el.id))
                formData.append('slug', JSON.stringify(updatedSlug))

                const res = await fetch('/api/menus/slug', {
                  method: 'PATCH',
                  body: formData,
                })

                const result = await res.json()
                if (!res.ok) throw new Error(result.error || 'Ошибка обновления')

                // router.refresh()
              } catch (err: unknown) {
                alert(err instanceof Error ? err.message : 'Ошибка')
              }
            }}
          />

          <span className={styles.slider}></span>
        </label>
        <p>{el.name}</p>
        {Array.isArray(el.slugs) &&
          el.slugs.map(String).includes(String(id)) &&
          <button style={{ fontSize: "0.6em", fontWeight: "700", backgroundColor: "white", padding: "2px 5px", borderRadius: "5px" }}
            onClick={async (e) => {
              e.preventDefault()
              async function fetchDishes(menuId: string) {
                try {
                  const response = await fetch(`/api/dishes?id=${menuId}`)
                  if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.error || 'Ошибка при получении блюд')
                  }
                  const dishes = await response.json()
                  setEditDishesInMenu(dishes)
                  setAtiveMenuName(el.name)
                  setOpenDish(true)
                } catch (error) {
                  console.error('Fetch dishes error:', error)
                  throw error
                }
              }
              await fetchDishes(el.id)
            }}>
            выбрать блюда
          </button>}
      </li>
    )
  })

  const dishesMenu = (editDishesInMenu ?? []).map(el => {
    return (
      <li key={el.id} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", justifyContent: "flex-end" }}>

        <p>{el.name}</p>
        <label className={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={
              Array.isArray(el.slugs) &&
              el.slugs.map(String).includes(String(id))

            }

            onClick={(e) => e.stopPropagation()}
            onChange={async (e) => {
              const newValue = e.target.checked

              try {
                const currentSlug = Array.isArray(el.slugs) ? el.slugs.map(String) : []

                const updatedSlug = newValue
                  ? [...new Set([...currentSlug, id])]
                  : currentSlug.filter((i) => i !== id)

                setEditDishesInMenu(prev =>
                  prev.map(item =>
                    item.id === el.id
                      ? { ...item, slugs: updatedSlug }
                      : item
                  )
                )
                const formData = new FormData()
                formData.append('id', String(el.id))
                formData.append('slug', JSON.stringify(updatedSlug))

                const res = await fetch('/api/dishes/slug', {
                  method: 'PATCH',
                  body: formData,
                })

                const result = await res.json()
                if (!res.ok) throw new Error(result.error || 'Ошибка обновления')

                // router.refresh()
              } catch (err: unknown) {
                alert(err instanceof Error ? err.message : 'Ошибка')
              }
            }}
          />

          <span className={styles.slider}></span>
        </label>
      </li>
    )
  })


  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver, // ✅ ИЗМЕНЕНИЕ
    defaultValues: {
      ...initialData,
    }
  })

  // ❌ удалить старое изображение
  const handleRemoveImage = (id: string) => {
    setImages(prev => prev.filter(img => img !== id))
    setRemovedImages(prev => [...prev, id])
  }

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    setSuccess('')

    try {
      const formData = new FormData()

      formData.append('id', initialData.id.toString()) // обязательно для идентификации сервиса
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('full_description', data.full_description)
      formData.append('is_available', String(data.is_available))


      // ➕ новые файлы
      if (data.files?.length) {
        Array.from(data.files).forEach(file => {
          formData.append('files', file)
        })
      }

      // ❌ удалённые изображения
      removedImages.forEach(id => {
        formData.append('removedImages', id)
      })

      const res = await fetch('/api/services', {
        method: 'PATCH',
        body: formData
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Ошибка обновления')

      setSuccess('Сервис обновлён')
      router.push('/admin')

    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Ошибка')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2><strong>Изменение услуги {initialData.name}</strong></h2>
      <label>
        <p>Название</p>
        <input {...register('name')} placeholder="Название" />
        <p>{errors.name?.message}</p>
      </label>

      <label>
        <p>Описание</p>
        <textarea {...register('description')} placeholder="Описание" />
        <p>{errors.description?.message}</p>
      </label>
      <label>
        <p>Полное описание</p>
        <textarea {...register('full_description')} placeholder="Полное описание" />
        <p>{errors.full_description?.message}</p>
      </label>
      <label>
        <input type="checkbox" {...register('is_available')} />
        Активен
      </label>

      <div style={{ border: "1px solid rgba(0,0,0,0.2)", borderRadius: "10px", padding: "10px", backgroundColor: "rgba(0,0,0,0.1)" }}>
        <h3 style={{ textAlign: "center", fontSize: "1.1em" }}>Что будет в меню</h3>
        <ul>{menu}</ul>
      </div>


      {openDish && dishesMenu.length > 0 && <div style={{ border: "1px solid rgba(0,0,0,0.2)", borderRadius: "10px", padding: "10px", backgroundColor: "rgba(0,0,0,0.1)" }}>
        <h3 style={{ textAlign: "center", fontSize: "1.1em" }}>Выберите блюда из меню <span style={{ textDecoration: "underline" }}>{ativeMenuName}</span> </h3>
        <ul>{dishesMenu}</ul>
      </div>}

      {/* 🖼 EXISTING IMAGES */}
      <div className={styles.imagesGrid}>
        {images.map(img => (
          <div key={img} className={styles.imageItem}>
            <Image
              src={img}
              alt=""
              width={120}
              height={100}
              className={styles.img}
            />

            <button
              type="button"
              onClick={() => handleRemoveImage(img)}
              className={styles.deleteBtn}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* ➕ NEW FILES */}
      <div style={{ display: "flex", flexDirection: "column", border: "1px solid rgba(0,0,0,0.2)", borderRadius: "10px", padding: "10px", backgroundColor: "rgba(0,0,0,0.1)" }}>
        <p style={{ fontSize: "1.1em" }}>Добавить файлы</p>
        <input
          type="file"
          multiple
          {...register('files')}
          accept=".png,.jpg,.jpeg,.svg"
        />
      </div>





      <button style={{ display: "inline-block", fontWeight: "700", margin: "0 auto", padding: "5px 10px", borderRadius: "5px", backgroundColor: "rgba(32, 32, 154, 0.1)" }} disabled={loading}>
        {loading ? <p style={{ color: "rgba(32, 32, 154, 0.7)" }}> Сохраняем... </p> : <p style={{ color: "black" }}> Сохранить </p>}
      </button>
      {success && <p>{success}</p>}
    </form >

  )
} 