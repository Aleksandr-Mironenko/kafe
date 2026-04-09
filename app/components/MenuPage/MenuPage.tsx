'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import styles from './page.module.scss'
import pagefood from '../../../public/food-dish-svgrepo-com.svg'
import { useRouter } from 'next/navigation'

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
}

export default function MenuPage({ dishes, menu }: { dishes: Dish[]; menu: string }) {
  const router = useRouter()
  const [dishesState, setDishes] = useState(dishes)
  useEffect(() => setDishes(dishes)

    , [dishes])


  return (
    <div className={styles.container}>
      <div className={styles.header}>

        <Link href={'/admin'} className={styles.backButton}>
          ← Назад
        </Link>

        <Link href={`/admin/menu/${menu}/create`}
          className={styles.createButton}>
          + Добавить блюдо
        </Link>

      </div>

      <h1 className="text-2xl font-bold mb-4">Блюда</h1>


      <div className={styles.dishList}>
        {dishesState.map(dish => (

          <div key={dish.id} className={styles.dishCard}>
            <Link href={`/admin/menu/${menu}/dish/${dish.id}`}>
              <Image src={dish.image_url || pagefood} alt={dish.name} className={styles.dishImage} width={80} height={80} />
              <div className={styles.dishInfo}>
                <p className={styles.dishName}>{dish.name}</p>
                <p className={styles.dishPrice}>€{dish.price}</p>
              </div>
            </Link>
            <div className={styles.actionButtons}>


              <Link href={`/admin/menu/${menu}/dish/${dish.id}/edit`} className={`${styles.actionButton} ${styles.edit}`}>
                ✏️
              </Link>

              <button onClick={async (e) => {
                e.preventDefault()
                if (!confirm(`Удалить блюдо "${dish.name}"?`)) return

                try {
                  const res = await fetch(`/api/dishes?id=${dish.id}`, {
                    method: 'DELETE',
                  })
                  const result = await res.json()
                  if (!res.ok) throw new Error(result.error || 'Ошибка при удалении')

                  alert('Блюдо удалено')
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
                  checked={dish.is_available}
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
                          id: dish.id,
                          is_available: newValue,
                        }),
                      })

                      const result = await res.json()
                      if (!res.ok) throw new Error(result.error || 'Ошибка')

                      setDishes(prev =>
                        prev.map(d =>
                          d.id === dish.id ? { ...d, is_available: newValue } : d
                        )
                      )
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
      </div>

      <button className={styles.floatingAddButton}>+</button>
    </div >
  )
}