'use client'
import Image from 'next/image'
import styles from './page.module.scss'
import pagefood from '../../../public/food-dish-svgrepo-com.svg'

import { Dish } from '@/services/dishService'
import Link from 'next/link'

export default function DishPage({ dish, menu }: { dish: Dish; menu: string }) {

  return (

    <div className={styles.container}>

      <div className={styles.header}>

        {/* <button onClick={() => window.history.back()} className={styles.backButton}>
          ← Назад
        </button> */}

        <Link href={`/admin/menu/${menu}`} className={styles.backButton}>
          ← Назад
        </Link>

        <Link href={`/admin/menu/${menu}/dish/${dish.id}/edit`} className={styles.createButton}>
          ✏️ Редактировать блюдо
        </Link>
        {/* {!editDish && <button className={styles.createButton} onClick={(e) => {  
          setEditDish(true)
           e.preventDefault()
            setSelectedDish(dish)
         }}  >
            ✏️ Редактировать блюдо
          </button>} */}
      </div>


      <h1 className="text-2xl font-bold mb-4">{dish.name}</h1>

      <div className={styles.dishDetails}>
        <Image
          src={dish.image_url || pagefood}
          alt={dish.name}
          width={200}
          height={200}
          style={{ borderRadius: '12px' }}
        />

        <p><strong>Цена:</strong> €{dish.price}</p>
        <p><strong>Вес:</strong> {dish.weight}</p>
        <p><strong>Ингредиенты:</strong> {dish.ingredients}</p>
        <p><strong>Краткое описание:</strong> {dish.short_description}</p>
        <p><strong>Полное описание:</strong> {dish.full_description}</p>
        <p><strong>Доступно:</strong> {dish.is_available ? 'Да' : 'Нет'}</p>
        <p><strong>Порядок в меню:</strong> {dish.order_index}</p>
      </div>

    </div>
  )
}