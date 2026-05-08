'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// import { useEffect, useState } from 'react'

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


export default function ServiceList({ services }: { services: Service[] }) {

  // const router = useRouter()



  // const [ls, setLs] = useState<CartItem[]>([])

  // const [scrollState, setScrollState] = useState<
  //   Record<string, { left: boolean; right: boolean }>
  // >({})
  // const scrollRefs = useRef<Record<string, HTMLUListElement | null>>({}); const STEP = 222;
  // const getCard = () => {
  //   const stored = localStorage.getItem("cart")
  //   const cart: CartItem[] = stored ? JSON.parse(stored) : []
  //   setLs(cart)
  // }

  // useEffect(() => {
  //   // getCard()

  // }, [])

  // useEffect(() => {
  //   const sync = () => {
  //     const stored = localStorage.getItem("cart")
  //     setLs(stored ? JSON.parse(stored) : [])
  //   }

  //   // внутри вкладки
  //   window.addEventListener("cartUpdated", sync)

  //   // между вкладками
  //   const storageHandler = (e: StorageEvent) => {
  //     if (e.key === "cart") {
  //       sync()
  //     }
  //   }

  //   window.addEventListener("storage", storageHandler)

  //   return () => {
  //     window.removeEventListener("cartUpdated", sync)
  //     window.removeEventListener("storage", storageHandler)
  //   }
  // }, [])

  // const checkScroll = (id: string) => {
  //   const el = scrollRefs.current[id]
  //   if (!el) return

  //   const left = el.scrollLeft > 0
  //   const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 2

  //   setScrollState(prev => ({
  //     ...prev,
  //     [id]: { left, right }
  //   }))
  // }

  // const initScroll = (id: string) => {
  //   const el = scrollRefs.current[id]
  //   if (!el) return

  //   const right = el.scrollWidth > el.clientWidth

  //   setScrollState(prev => ({
  //     ...prev,
  //     [id]: {
  //       left: false,
  //       right
  //     }
  //   }))
  // }




  // const updateCart = (updated: CartItem[]) => {
  //   localStorage.setItem("cart", JSON.stringify(updated))
  //   window.dispatchEvent(new Event("cartUpdated"))
  //   setLs(updated)
  // }

  // const scrollLeft = (id: string) => {
  //   const el = scrollRefs.current[id]
  //   if (!el) return

  //   el.scrollBy({ left: -STEP, behavior: 'smooth' })
  //   setTimeout(() => checkScroll(id), 150)
  // }

  // const scrollRight = (id: string) => {
  //   const el = scrollRefs.current[id]
  //   if (!el) return

  //   el.scrollBy({ left: STEP, behavior: 'smooth' })
  //   setTimeout(() => checkScroll(id), 150)
  // }



  const correctText = (el: string, len: number) => {

    return el.slice(0, len - 3) + "..."
  }

  // const dishesByMenu = dishes.reduce((acc, dish) => {
  //   if (!acc[dish.menu_id]) {
  //     acc[dish.menu_id] = []
  //   }

  //   acc[dish.menu_id].push(dish)

  //   return acc
  // }, {} as Record<string, Dish[]>)


  // const ddd = (menus ?? []).map((el: Menu) => {
  //   const filteredDishes = (menus[el.id] || []).filter(
  //     (dish) => dish.is_available)

  //   const arrDishes =
  //     filteredDishes.map((dish: Dish) => {
  //       const quantity = ls.find(el => el.id === dish.id)?.quantity || 0

  //       return (
  //         <li className={styles.card} key={dish.id}>

  //           <div style={{ display: "flex", flexDirection: "column" }}>
  //             <div style={{ width: "100%", position: "relative", aspectRatio: "1 / 1" }}>  {/*картинка со счетчиком */}
  //               {dish.image_url &&
  //                 // <div style={{ width: "100%", position: "relative", aspectRatio: "1 / 1" }}>
  //                 <Image
  //                   // style={{ borderRadius: "8px", backgroundColor: "transparent" }}
  //                   className={`${quantity !== 0 ? styles.imageselect : styles.image}`}
  //                   fill
  //                   src={dish.image_url}
  //                   alt={dish.name} />
  //                 // </div>
  //               }
  //               {quantity !== 0 && (
  //                 <div
  //                   style={{
  //                     position: "absolute",
  //                     top: "50%",
  //                     left: "50%",
  //                     transform: "translate(-50%, -60%)",
  //                     width: "60px",
  //                     height: "60px",
  //                     display: "flex",
  //                     alignItems: "center",
  //                     justifyContent: "center",
  //                     borderRadius: "50%",
  //                     background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 80%)",
  //                     color: "black",
  //                     fontWeight: 700,
  //                     fontSize: "40px"
  //                   }}
  //                 >
  //                   {ls.find(el => el.id === dish.id)?.quantity || ""}
  //                 </div>
  //               )}

  //             </div>
  //             <p className={styles.dish__name}>{dish.name}</p>

  //             <div style={{ width: "100%", height: "60px", color: "rgba(0,0,0,0.6)", fontSize: "14px", marginTop: "5px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}> {/*текст ингридиенты, грамовка и тд*/}
  //               <p style={{ wordBreak: "break-word" }}>{correctText(dish.ingredients, 30)}</p>
  //               <p style={{ textAlign: "right", fontWeight: "700" }}>{dish.weight} гр.</p>

  //             </div>

  //           </div >
  //           <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
  //             {quantity !== 0 ?
  //               <div style={{ display: "flex", justifyContent: "space-around", width: "70%", margin: "0 auto" }}>
  //                 {quantity !== 0 &&
  //                   <ButtonDel dish={dish} ls={ls} updateCart={updateCart} />
  //                 }
  //                 <p style={{ fontWeight: "700", display: "flex", alignItems: "center" }}>{dish.price} ₽</p>
  //                 <ButtonAdd dish={dish} updateCart={updateCart} marker={"+"} />
  //               </div>
  //               :
  //               <p style={{ fontWeight: "700", display: "flex", alignItems: "center" }}>{dish.price}  ₽</p>
  //             }
  //             {quantity === 0 && <ButtonAdd dish={dish} updateCart={updateCart} marker={"Добавить"} />}
  //           </div>
  //         </li >
  //       )
  //     })
  // console.log('menu', el.id)
  // console.log('filtered', filteredDishes)

  // return arrDishes.length !== 0 && el.is_available && <li
  //   style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start " }} key={el.id}>
  //   <h3 className={styles.menuName} >{el.name}</h3>
  //   {/* <div style={{ width: "88%", minWidth: "300px", overflowX: "hidden", margin: "0 auto" }}> */}
  //   <div className={styles.carousel}>

  //     {/* LEFT */}
  //     {scrollState[el.id]?.left && (
  //       <div
  //         onClick={() => scrollLeft(el.id)}
  //         className={`${styles.arrow} ${styles['arrow--left']}`}
  //       >
  //         {'<'}
  //       </div>
  //     )}

  //     <div className={styles.viewport}>
  //       <ul
  //         ref={(elRef) => {
  //           scrollRefs.current[el.id] = elRef
  //         }}
  //         onScroll={() => checkScroll(el.id)}
  //         className={`${styles.noscrollbar} ${styles.list}`}
  //       >
  //         {arrDishes}
  //       </ul>
  //     </div>

  //     {/* RIGHT */}
  //     {scrollState[el.id]?.right && (
  //       <div
  //         onClick={() => scrollRight(el.id)}
  //         className={`${styles.arrow} ${styles['arrow--right']}`}
  //       >
  //         {'>'}
  //       </div>
  //     )}

  //   </div>

  // </li >

  // })

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     menu.forEach(m => initScroll(m.id))
  //   }, 50)

  //   return () => clearTimeout(timeout)
  // }, [menu, dishes])



  const ddd = (services ?? []).map(el => (
    <li key={el.id} className={styles.li}>
      <Link href={`services/${el.url_name}`}>
        <div className={styles.wrapper} >
          <p className={styles.name}>{el.name}</p>
          <Link href={`services/${el.url_name}`} className={styles.detailsButton}>Подробнее </Link >
        </div>
      </Link>
    </li >
  ))


  return (<div style={{ display: "flex", flexDirection: "column" }}>
    <div className={`${styles.title}  `}>
      <h2>Список всех услуг</h2>
    </div>
    <div className={styles.container}>

      <ul style={{ listStyleType: "none", display: "flex", gap: "10px", flexDirection: "column" }}>
        {ddd}
      </ul>

    </div>
  </div>
  )
}