
"use client"
import Image from 'next/image'
import pagefood from '../../../public/food-dish-svgrepo-com.svg'
import Link from 'next/link'
import styles from './page.module.scss'
import { useRouter } from 'next/navigation'

// import { useState, useEffect } from 'react'

type Menu = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  created_at: string | null;
  is_available: boolean
}


const AdminPage = ({ menu }: { menu: Menu[] }) => {
  const router = useRouter()






  return (
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
                src={menuel.image_url || pagefood}
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
                  onClick={(e) => e.stopPropagation()}
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
  )
}
export default AdminPage


