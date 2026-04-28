
"use client"
import Image from 'next/image'
import pagefood from '../../../public/food-dish-svgrepo-com.svg'
import Link from 'next/link'

import { useRouter } from 'next/navigation'
import ReviewPage from '@/app/components/ReviewPage/ReviewPage'
// import { useState, useEffect } from 'react'
import styles from './page.module.scss'
type Menu = {
  url_name: string
  id: string
  name: string
  description: string | null
  image_url: string | null
  created_at: string | null
  is_available: boolean
}

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
type Review = {
  id: string;
  image_url: string;
  created_at: string;
}
const AdminPage = ({ menu, services, reviews }: { menu: Menu[], services: Service[], reviews: Review[] }) => {
  const router = useRouter()

  return (<>
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Меню</h1>
        <Link href={`/admin/create`}
          className={styles.createButton}>
          + Создать меню
        </Link>

      </div>

      <div className={styles.grid}>
        {(menu || []).map(menuel => (

          <div key={menuel.id} className="menuCard">
            <Link href={`/admin/menu/${menuel.id}`}>
              <Image
                src={menuel.image_url ?? pagefood.src}
                alt={menuel.name}
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }}
                width={400}
                height={180}
              />
              <p style={{ marginTop: '8px', fontWeight: '600', fontSize: '1rem' }}>{menuel.name}</p>

            </Link>
            <div className={styles.actionButtons}>


              <Link href={`/admin/menu/${menuel.id}/edit`} className={`${styles.actionButton} ${styles.edit}`}>
                ✏️
              </Link>

              <button onClick={async (e) => {
                e.preventDefault()
                if (!confirm(`Удалить все меню "${menuel.name}"?`)) return

                try {
                  const res = await fetch(`/api/menus?id=${menuel.id}`, {
                    method: 'DELETE',
                  })
                  const result = await res.json()
                  if (!res.ok) throw new Error(result.error || 'Ошибка при удалении')

                  alert('Меню удалено')
                  // обновляем список без перезагрузки
                  router.refresh()// или лучше обновлять state
                  // setMenu(prev => prev.filter(item => item.id !== menuel.id))
                } catch (err: unknown) {
                  alert(err instanceof Error ? err.message : 'Ошибка')
                }
              }}


                className={`${styles.actionButton} ${styles.delete}`
                }>🗑️</button>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={menuel.is_available}
                  onChange={async (e) => {
                    e.stopPropagation()

                    const newValue = e.target.checked

                    try {
                      const res = await fetch('/api/menus/toggle', {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          id: menuel.id,
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

        ))
        }
      </div >
    </div >
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Услуги</h1>
        <Link href={`/admin/services/create`}  // /admin/servises/create
          className={styles.createButton}>
          + Создать услугу
        </Link>

      </div>

      <div className={styles.grid}>
        {(services || []).map(servicesel => (

          <div key={servicesel.id} className="menuCard">
            <Link href={`/admin/services/${servicesel.url_name}`}>
              {/* <Image
                src={servicesel.images[0] || pagefood} //сделать еще и лого надо оно мне
                alt={servicesel.name}
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }}
                width={400}
                height={180}
              /> */}
              <p style={{ marginTop: '8px', fontWeight: '600', fontSize: '1rem' }}>{servicesel.name}</p>

            </Link>
            <div className={styles.actionButtons}>


              <Link href={`/admin/services/${servicesel.url_name}/edit`} className={`${styles.actionButton} ${styles.edit}`}>  {/*edit*/}
                ✏️
              </Link>

              <button onClick={async (e) => {
                e.preventDefault()
                if (!confirm(`Удалить весь сервис "${servicesel.name}"?`)) return

                try {
                  const res = await fetch(`/api/services?id=${servicesel.id}`, {
                    method: 'DELETE',
                  })
                  const result = await res.json()
                  if (!res.ok) throw new Error(result.error || 'Ошибка при удалении')

                  alert('Сервис удален')
                  // обновляем список без перезагрузки
                  router.refresh()// или лучше обновлять state
                  // setMenu(prev => prev.filter(item => item.id !== menuel.id))
                } catch (err: unknown) {
                  alert(err instanceof Error ? err.message : 'Ошибка')
                }
              }}


                className={`${styles.actionButton} ${styles.delete}`
                }>🗑️</button>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={servicesel.is_available}
                  onClick={(e) => e.stopPropagation()}
                  onChange={async (e) => {
                    e.stopPropagation()

                    const newValue = e.target.checked

                    try {
                      const res = await fetch('/api/services', {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          id: servicesel.id,
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

        ))
        }
      </div >
    </div >
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Отзывы</h1>
        <Link href={`/admin/reviews/edit`}  // /admin/servises/create
          className={`${styles.actionButton} ${styles.edit}`}>
          ✏️Редактировать  отзывы
        </Link>

      </div>


      <ReviewPage reviews={reviews} />




    </div >



  </>
  )
}
export default AdminPage


