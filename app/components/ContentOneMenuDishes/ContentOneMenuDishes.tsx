"use client"


import ButtonAdd from "../ButtonAdd/ButtonAdd";
import ButtonDel from "../ButtonDel/ButtonDel";
import Image from "next/image"
// import ButtonAdd from "../ButtonAdd/ButtonAdd";
// import ButtonDelete from "../ButtonDelete/ButtonDelete";
import { useState, useEffect } from "react";
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

const ContentOneMenuDishes = ({ menu, dishes }: { menu: Menu[], dishes: Dish[] }) => {
  const [ls, setLs] = useState<CartItem[]>([])


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






  const updateCart = (updated: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updated))
    window.dispatchEvent(new Event("cartUpdated"))
    setLs(updated)
  }





  const correctText = (el: string, len: number) => {
    return el.slice(0, len - 3) + "..."
  }

  const ddd = menu.map((el: Menu) => {
    const filteredDishes = dishes.filter((dish: Dish) =>
      dish.menu_id === el.id && dish.is_available);

    // const arrDishes =
    //   filteredDishes.map((dish: Dish) => {
    //     const quantity = ls.find(el => el.id === dish.id)?.quantity || 0

    //     return (
    //       <li className={styles.card} key={dish.id}>
    //         <p style={{ margin: "0 auto", fontSize: "20px" }}>{dish.name}</p>
    //         <div style={{ display: "flex", flexDirection: "row" }}>
    //           <div style={{ position: "relative" }}>
    //             {dish.image_url &&
    //               <div style={{ height: "100px", width: "100px" }}>
    //                 <Image
    //                   // style={{ borderRadius: "8px", backgroundColor: "transparent" }}
    //                   className={`${quantity !== 0 ? styles.imageselect : styles.image}`}
    //                   width={100}
    //                   height={100}
    //                   src={dish.image_url}
    //                   alt={dish.name} />
    //               </div>
    //             }
    //             {quantity !== 0 && (
    //               <div
    //                 style={{
    //                   position: "absolute",
    //                   top: "50%",
    //                   left: "50%",
    //                   transform: "translate(-50%, -60%)",
    //                   width: "60px",
    //                   height: "60px",
    //                   display: "flex",
    //                   alignItems: "center",
    //                   justifyContent: "center",
    //                   borderRadius: "50%",
    //                   background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 80%)",
    //                   color: "black",
    //                   fontWeight: 700,
    //                   fontSize: "40px"
    //                 }}
    //               >
    //                 {ls.find(el => el.id === dish.id)?.quantity || ""}
    //               </div>
    //             )}


    //             <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

    //             </div>
    //           </div>
    //           <div style={{ width: "100px", fontSize: "14px", marginTop: "5px" }}>
    //             <p style={{ textAlign: "right" }}>{dish.weight} гр.</p>
    //             <p style={{ wordBreak: "break-word" }}>{correctText(dish.ingredients, 30)}</p>
    //           </div>

    //         </div>
    //         <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
    //           {quantity !== 0 ?
    //             <div style={{ display: "flex", justifyContent: "space-around", width: "70%", margin: "0 auto" }}>

    //               <ButtonDel dish={dish} ls={ls} updateCart={updateCart} />

    //               <p>{dish.price} ₽</p>
    //               <ButtonAdd dish={dish} updateCart={updateCart} marker={"+"} />
    //             </div>
    //             :
    //             <p>{dish.price} ₽</p>
    //           }
    //           {quantity === 0 && <ButtonAdd dish={dish} updateCart={updateCart} marker={"Добавить"} />}
    //         </div>
    //       </li >
    //     )
    //   })
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
              <p className={styles.dish__name} >{dish.name}</p>

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
                  <p style={{ fontWeight: "700", display: "flex", alignItems: "center", whiteSpace: "nowrap", margin: "0 5px" }}>{dish.price} ₽</p>
                  <ButtonAdd dish={dish} updateCart={updateCart} marker={"+"} />
                </div>
                :
                <p style={{ fontWeight: "700", display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>{dish.price}  ₽</p>
              }
              {quantity === 0 && <ButtonAdd dish={dish} updateCart={updateCart} marker={"Добавить"} />}
            </div>
          </li >
        )
      })

    return (arrDishes.length !== 0 && el.is_available) ? <li
      style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} key={el.id}>
      <h3 className={styles.menuName}  >{el.name}</h3>
      {/* <div style={{ width: "88%", minWidth: "300px", overflowX: "hidden", margin: "0 auto" }}> */}
      <div style={{
        position: "relative",
      }}>

        <div
          style={{
            width: "100%",//85%
            maxWidth: "1000px", // ограничение
            minWidth: "300px",
            overflowX: "hidden",
            margin: "0 auto",

          }}>

          <ul
            style={{
              listStyleType: "none",
              display: "flex",
              gap: "5px",
              flexDirection: "row",
              flexWrap: "wrap",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              maxWidth: "100%",
              // justifyContent: "center",
              alignItems: "center", justifyContent: "center"
            }}>
            {arrDishes}
          </ul>


        </div >



      </div>

    </li > : <li style={{ margin: "0 auto", width: "100%" }}>
      <div style={{ margin: "50px auto", width: "100%" }}> Нет доступных для заказа блюд (но мы уже готовим)</div>
    </li>

  })

  return <ul className={styles.contentOneMenuDishes}>
    {ddd.length === 0 ? (
      <li style={{ textAlign: "center", width: "100%" }}>
        Нет доступных для заказа блюд
      </li>
    ) : (
      ddd
    )}
  </ul>
}
export default ContentOneMenuDishes

