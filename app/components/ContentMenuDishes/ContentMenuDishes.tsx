"use client"


import ButtonAdd from "../ButtonAdd/ButtonAdd";
import ButtonDel from "../ButtonDel/ButtonDel";
import Image from "next/image"
// import ButtonAdd from "../ButtonAdd/ButtonAdd";
// import ButtonDelete from "../ButtonDelete/ButtonDelete";
import { useState, useEffect, useRef } from "react";
import styles from "./ContentMenuDishes.module.scss"
import Link from "next/link";
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
export type Dish = {
  id: string
  url_name: string
  menu_id: string
  name: string
  ingredients: string
  short_description?: string
  full_description: string
  weight?: string
  price: number
  image_url?: string
  order_index?: number
  is_available?: boolean
  slugs: string[]
}
type CartItem = Dish & { quantity: number }

const ContentMenuDishes = ({ menu, dishes }: { menu: Menu[], dishes: Dish[] }) => {
  const [ls, setLs] = useState<CartItem[]>([])
  const [scrollState, setScrollState] = useState<
    Record<string, { left: boolean; right: boolean }>
  >({})

  const scrollRefs = useRef<Record<string, HTMLUListElement | null>>({}); const STEP = 222;
  const getCard = () => {
    const stored = localStorage.getItem("cart")
    const cart: CartItem[] = stored ? JSON.parse(stored) : []
    setLs(cart)
  }

  useEffect(() => {
    getCard()

  }, [])

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

  const checkScroll = (id: string) => {
    const el = scrollRefs.current[id]
    if (!el) return

    const left = el.scrollLeft > 0
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 1

    setScrollState(prev => ({
      ...prev,
      [id]: { left, right }
    }))
  }

  useEffect(() => {
    menu.forEach(m => {
      setTimeout(() => checkScroll(m.id), 0)
    })
  }, [menu, dishes])


  const initScroll = (id: string) => { //найти место в меню
    const el = scrollRefs.current[id]
    if (!el) return

    const right = el.scrollWidth > el.clientWidth

    setScrollState(prev => ({
      ...prev,
      [id]: {
        left: false,
        right
      }
    }))
  }

  const updateCart = (updated: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updated))
    window.dispatchEvent(new Event("cartUpdated"))
    setLs(updated)
  }

  const scrollLeft = (id: string) => {
    const el = scrollRefs.current[id]
    if (!el) return

    el.scrollBy({ left: -STEP, behavior: "smooth" })
    setTimeout(() => checkScroll(id), 700)
  }

  const scrollRight = (id: string) => {
    const el = scrollRefs.current[id]
    if (!el) return

    el.scrollBy({ left: STEP, behavior: "smooth" })
    setTimeout(() => checkScroll(id), 700)
  }



  const correctText = (el: string, len: number) => {

    return el.slice(0, len - 3) + "..."
  }

  const ddd = menu.map((el: Menu) => {
    const filteredDishes = dishes.filter((dish: Dish) =>
      dish.menu_id === el.id && dish.is_available);

    const arrDishes =
      filteredDishes.map((dish: Dish) => {
        const quantity = ls.find(el => el.id === dish.id)?.quantity || 0

        return (
          <li className={styles.card} key={dish.id}>
            <Link href={`/dish/${dish.url_name}`} >
              <div className={styles.card__wrapper} >
                <div className={styles.card__wrapperblock} >  {/*картинка со счетчиком */}
                  {dish.image_url &&
                    <Image
                      className={`${quantity !== 0 ? styles.imageselect : styles.image}`}
                      fill
                      src={dish.image_url}
                      alt={dish.name} />
                    // </div>
                  }
                  {quantity !== 0 && (
                    <div className={styles.card__quantity}
                    >
                      {ls.find(el => el.id === dish.id)?.quantity || ""}
                    </div>
                  )}

                </div>
                <p className={styles.dish__name}>{dish.name}</p>

                <div className={styles.dish__haracteristic} > {/*текст ингридиенты, грамовка и тд*/}
                  <p className={styles.dish__ingredients}   >{correctText(dish.ingredients, 30)}</p>
                  <p className={styles.dish__weight}  >{dish.weight} гр.</p>

                </div>

              </div >
            </Link >
            <div className={styles.dish__down}  >
              {quantity !== 0 ?
                <div className={styles.dish__quantity} >
                  {quantity !== 0 &&
                    <ButtonDel dish={dish} ls={ls} updateCart={updateCart} />
                  }
                  <p className={styles.dish__priceString}  >{dish.price} ₽</p>
                  <ButtonAdd dish={dish} updateCart={updateCart} marker={"+"} />
                </div>
                :
                <p className={styles.dish__priceString}>{dish.price}  ₽</p>
              }
              {quantity === 0 && <ButtonAdd dish={dish} updateCart={updateCart} marker={"Добавить"} />}
            </div>
          </li >
        )
      })


    return arrDishes.length !== 0 && el.is_available &&
      <li className={styles.dish__el}
        key={el.id}>
        <h3 className={styles.menuName} >{el.name}</h3>
        <div className={styles.carousel}>
          {/* LEFT */}
          {scrollState[el.id]?.left && (
            <div
              onClick={() => scrollLeft(el.id)}
              className={`${styles.arrow} ${styles['arrow--left']}`}
            >
              {'<'}
            </div>
          )}
          <div className={styles.viewport}>
            <ul
              ref={(elRef) => {
                scrollRefs.current[el.id] = elRef
              }}
              onScroll={() => checkScroll(el.id)}
              className={`${styles.noscrollbar} ${styles.list}`}
            >
              {arrDishes}
            </ul>
          </div>

          {/* RIGHT */}
          {scrollState[el.id]?.right && (
            <div
              onClick={() => scrollRight(el.id)}
              className={`${styles.arrow} ${styles['arrow--right']}`}
            >
              {'>'}
            </div>
          )}
        </div>

      </li >

  })
  useEffect(() => {
    const timeout = setTimeout(() => {
      menu.forEach(m => initScroll(m.id))
    }, 50)

    return () => clearTimeout(timeout)
  }, [menu, dishes])
  return (
    // <div className={styles.content}>
    //   <div className={styles.menuSection}>
    <ul className={styles.listMenu} >
      {ddd}
    </ul>
    //   </div >
    // </div>
  )

}
export default ContentMenuDishes