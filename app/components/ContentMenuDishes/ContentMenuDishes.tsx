"use client"


import ButtonAdd from "../ButtonAdd/ButtonAdd";
import ButtonDel from "../ButtonDel/ButtonDel";
import Image from "next/image"
// import ButtonAdd from "../ButtonAdd/ButtonAdd";
// import ButtonDelete from "../ButtonDelete/ButtonDelete";
import { useState, useEffect, useRef } from "react";
import styles from "./ContentMenuDishes.module.scss"
type Menu = {
  url_name: string;
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  created_at: string | null;
  is_available: boolean
}
export type Dish = {
  id: string
  menu_id: string
  name: string
  ingredients: string
  short_description?: string
  full_description?: string
  weight?: string
  price: number
  image_url?: string
  order_index?: number
  is_available?: boolean
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

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ width: "100%", position: "relative", aspectRatio: "1 / 1" }}>  {/*картинка со счетчиком */}
                {dish.image_url &&
                  // <div style={{ width: "100%", position: "relative", aspectRatio: "1 / 1" }}>
                  <Image
                    // style={{ borderRadius: "8px", backgroundColor: "transparent" }}
                    className={`${quantity !== 0 ? styles.imageselect : styles.image}`}
                    fill
                    src={dish.image_url}
                    alt={dish.name} />
                  // </div>
                }
                {quantity !== 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -60%)",
                      width: "60px",
                      height: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 80%)",
                      color: "black",
                      fontWeight: 700,
                      fontSize: "40px"
                    }}
                  >
                    {ls.find(el => el.id === dish.id)?.quantity || ""}
                  </div>
                )}

              </div>
              <p className={styles.dish__name}>{dish.name}</p>

              <div style={{ width: "100%", height: "60px", color: "rgba(0,0,0,0.6)", fontSize: "14px", marginTop: "5px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}> {/*текст ингридиенты, грамовка и тд*/}
                <p style={{ wordBreak: "break-word" }}>{correctText(dish.ingredients, 30)}</p>
                <p style={{ textAlign: "right", fontWeight: "700" }}>{dish.weight} гр.</p>

              </div>

            </div >
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
              {quantity !== 0 ?
                <div style={{ display: "flex", justifyContent: "space-around", width: "70%", margin: "0 auto" }}>
                  {quantity !== 0 &&
                    <ButtonDel dish={dish} ls={ls} updateCart={updateCart} />
                  }
                  <p style={{ fontWeight: "700", display: "flex", alignItems: "center" }}>{dish.price} ₽</p>
                  <ButtonAdd dish={dish} updateCart={updateCart} marker={"+"} />
                </div>
                :
                <p style={{ fontWeight: "700", display: "flex", alignItems: "center" }}>{dish.price}  ₽</p>
              }
              {quantity === 0 && <ButtonAdd dish={dish} updateCart={updateCart} marker={"Добавить"} />}
            </div>
          </li >
        )
      })


    return arrDishes.length !== 0 && el.is_available && <li
      style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} key={el.id}>
      <h3 className={styles.menuName} >{el.name}</h3>
      {/* <div style={{ width: "88%", minWidth: "300px", overflowX: "hidden", margin: "0 auto" }}> */}
      <div style={{
        position: "relative",
      }}>
        {scrollState[el.id]?.left && (<div
          onClick={() => scrollLeft(el.id)}
          style={{
            position: "absolute",
            left: "30px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            backgroundColor: "black"
          }}
        >
          {"<"}
        </div>
        )}
        <div
          style={{
            width: "85%",
            maxWidth: "1000px", // ограничение
            minWidth: "300px",
            overflow: "hidden",
            margin: "0 auto",

          }}>

          <ul ref={(el) => {
            scrollRefs.current[el?.dataset.menuid || ""] = el;
          }}
            data-menuid={el.id}
            onScroll={() => checkScroll(el.id)}
            className={styles.noscrollbar} style={{
              listStyleType: "none",
              display: "flex",
              gap: "5px",
              flexDirection: "row",
              overflowX: "hidden",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              maxWidth: "100%",
              // justifyContent: "center",
              alignItems: "center"
            }}>
            {arrDishes}
          </ul>


        </div >
        {scrollState[el.id]?.right && (<div
          onClick={() => scrollRight(el.id)}
          style={{
            position: "absolute",
            right: "30px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            backgroundColor: "black"
          }}
        >
          {">"}
        </div>

        )}
      </div>

    </li >

  })

  return <ul style={{ listStyleType: "none", display: "flex", gap: "10px", flexDirection: "column" }}>
    {ddd}
  </ul>
}
export default ContentMenuDishes