"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import ButtonAdd from "../ButtonAdd/ButtonAdd"
import ButtonDel from "../ButtonDel/ButtonDel"

import styles from "./DishPageClient.module.scss"

type Dish = {
  id: string
  name: string
  url_name: string
  ingredients: string
  short_description?: string
  weight?: string
  price: number
  image_url?: string
  slugs: string[]
  menu_id: string
  full_description: string
}

type CartItem = Dish & { quantity: number }

export default function DishCard({
  dishInfo
}: {
  dishInfo: Dish
}) {
  const [ls, setLs] = useState<CartItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("cart")
    const cart = stored ? JSON.parse(stored) : []
    setLs(cart)
  }, [])

  const updateCart = (updated: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updated))
    window.dispatchEvent(new Event("cartUpdated"))
    setLs(updated)
  }
  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem("cart")
      setLs(stored ? JSON.parse(stored) : [])
    }

    // внутри вкладки
    window.addEventListener("cartUpdated", sync)

    // между вкладками
    const storageHandler = (e: StorageEvent) => {
      if (e.key === "cart") {
        sync()
      }
    }

    window.addEventListener("storage", storageHandler)

    return () => {
      window.removeEventListener("cartUpdated", sync)
      window.removeEventListener("storage", storageHandler)
    }
  }, [])
  const quantity =
    ls.find(el => el.id === dishInfo.id)?.quantity || 0

  return (
    <article className={styles.card}>

      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        {dishInfo.image_url && (
          <Image
            src={dishInfo.image_url}
            alt={dishInfo.name}
            fill
            className={
              quantity > 0
                ? styles.imageDisabled
                : styles.image
            }
          />
        )}

        {quantity > 0 && (
          <div className={styles.quantity}>
            {quantity}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className={styles.info}>

        <h3 className={styles.name}>
          {dishInfo.name}
        </h3>

        <p className={styles.desc}>
          {dishInfo.full_description}
        </p>

        <p className={styles.desc}>
          <b>Ингридиенты: </b>
        </p>
        <p className={styles.desc}>
          {dishInfo.ingredients}
        </p>
        <div className={styles.meta}>
          <span>{dishInfo.weight} г</span>
          <span>{dishInfo.price} ₽</span>
        </div>

      </div>

      {/* ACTIONS */}
      <div className={styles.actions}>
        {quantity > 0 ? (
          <div className={styles.counter}>
            <ButtonDel
              dish={dishInfo}
              ls={ls}
              updateCart={updateCart}
            />

            <span className={styles.counterValue}>
              {quantity}
            </span>

            <ButtonAdd
              dish={dishInfo}
              updateCart={updateCart}
              marker="+"
            />
          </div>
        ) : (
          <ButtonAdd
            dish={dishInfo}
            updateCart={updateCart}
            marker="Добавить"
          />
        )}
      </div>

    </article>
  )
}