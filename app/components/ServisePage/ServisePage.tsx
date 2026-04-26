'use client'
import Image from 'next/image'
import Link from 'next/link'
// import { useState, useEffect } from 'react'

import styles from './page.module.scss'
import pagefood from '../../../public/food-dish-svgrepo-com.svg'
import { useRouter } from 'next/navigation'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
type Service = {
  id: number
  name: string
  description: string
  full_description: string
  is_available: boolean
  created_at: string | null
  url_name: string
  images: string[]
}

export default function ServicesPage({ services, service }: { services: Service; service: string }) {
  const router = useRouter()
  // const [dishesState, setDishes] = useState(dishes)
  // useEffect(() => setDishes(dishes)

  //   , [dishes])


  return (//фундаментально тут должны быть описания и катринки
    <div className={styles.container}>
      <div className={styles.header}>

        <Link href={'/admin'} className={styles.backButton}>
          ← Назад
        </Link>

        {/* <Link href={`/admin/services/${service}/create`}
          className={styles.createButton}>
          + Добавить блюдо
        </Link> */}
        {/* внутри нельзя создать что то дополнительное если только потом обознчить список товаров */}

      </div>

      <h1 className="text-2xl font-bold mb-4">{services.name}</h1>

      <p className="text-2xl font-bold mb-4">{services.description}</p >
      <p className="text-2xl font-bold mb-4">{services.full_description}</p >
      <p className="text-2xl font-bold mb-4">{services.id}</p >
      <p className="text-2xl font-bold mb-4">{services.is_available}</p >
      <p className="text-2xl font-bold mb-4">{services.url_name}</p >
      <p className="text-2xl font-bold mb-4">{services.created_at}</p >
      <p className="text-2xl font-bold mb-4">{services.images.length}</p >
      <p className="text-2xl font-bold mb-4">{services.images.length}</p >
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
      >
        {services.images.map((src, i) => (
          <SwiperSlide key={i}>
            <div style={{ position: 'relative', height: 300 }}>
              <Image
                src={src}
                alt={`slide-${i}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </SwiperSlide>

        ))}
      </Swiper>
      <Link href={`/admin/services/${services.url_name}/service/${services.id}/edit`} className={`${styles.actionButton} ${styles.edit}`}>
        ✏️
      </Link>

      <button onClick={async (e) => {
        e.preventDefault()
        if (!confirm(`Удалить блюдо "${services.name}"?`)) return

        try {
          const res = await fetch(`/api/dishes?id=${services.id}`, {
            method: 'DELETE',
          })
          const result = await res.json()
          if (!res.ok) throw new Error(result.error || 'Ошибка при удалении')

          alert('Сервис удален ')
          // обновляем список без перезагрузки
          router.refresh()// или лучше обновлять state
        } catch (err: unknown) {
          alert(err instanceof Error ? err.message : 'Ошибка')
        }
      }}


        className={`${styles.actionButton} ${styles.delete}`
        }>🗑️</button>
      {/* <div className={styles.dishList}>
        {(services ?? []).map(service => (

          <div key={service.id} className={styles.dishCard}>
            <Link href={`/admin/services/${service.url_name}/dish/${service.id}`}>
              <Image src={service. || pagefood} alt={service.name} className={styles.dishImage} width={80} height={80} />
              <div className={styles.dishInfo}>
                <p className={styles.dishName}>{service.name}</p>
                <p className={styles.dishPrice}>€{service.price}</p>
              </div>
            </Link>
            <div className={styles.actionButtons}>


              <Link href={`/admin/services/${service.url_name}/service/${service.id}/edit`} className={`${styles.actionButton} ${styles.edit}`}>
                ✏️
              </Link>

              <button onClick={async (e) => {
                e.preventDefault()
                if (!confirm(`Удалить блюдо "${service.name}"?`)) return

                try {
                  const res = await fetch(`/api/dishes?id=${service.id}`, {
                    method: 'DELETE',
                  })
                  const result = await res.json()
                  if (!res.ok) throw new Error(result.error || 'Ошибка при удалении')

                  alert('Сервис удален ')
                  // обновляем список без перезагрузки
                  router.refresh()// или лучше обновлять state
                } catch (err: unknown) {
                  alert(err instanceof Error ? err.message : 'Ошибка')
                }
              }}


                className={`${styles.actionButton} ${styles.delete}`
                }>🗑️</button>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={service.is_available}
                  onClick={(e) => e.stopPropagation()}
                  onChange={async (e) => {
                    e.stopPropagation()

                    const newValue = e.target.checked

                    try {
                      const res = await fetch('/api/dishes/toggle', {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          id: service.id,
                          is_available: newValue,
                        }),
                      })

                      const result = await res.json()
                      if (!res.ok) throw new Error(result.error || 'Ошибка')

                      router.refresh()// или лучше обновлять state

                    } catch (err: unknown) {
                      alert(err instanceof Error ? err.message : 'Ошибка')
                    }
                  }}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>

        ))}
      </div> */}

      {/* <button className={styles.floatingAddButton}>+</button> */}
    </div >
  )
}