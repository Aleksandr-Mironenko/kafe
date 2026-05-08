'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './ServiseUserPage.module.scss'
import { useRouter } from 'next/navigation'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ButtonAdd from '../ButtonAdd/ButtonAdd'
import ButtonDel from '../ButtonDel/ButtonDel'
import { useEffect, useRef, useState } from 'react'
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
  slugs: string[]
}






type CartItem = Dish & { quantity: number }





export default function ServiseUserPage({ services, menu, dishes }: { services: Service, menu: Menu[], dishes: Dish[] }) {

  const router = useRouter()
  // const [service, setService] = useState<Service>({
  // id: 0,
  //   name: "",
  //     description: "",
  //       full_description: "",
  //         is_available: true,
  //           created_at: "",
  //             url_name: "",
  //               images: [""],
  // })
  // useEffect(() => {
  //   setService(services)
  // }, [services])



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
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 2

    setScrollState(prev => ({
      ...prev,
      [id]: { left, right }
    }))
  }

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

    el.scrollBy({ left: -STEP, behavior: 'smooth' })
    setTimeout(() => checkScroll(id), 150)
  }

  const scrollRight = (id: string) => {
    const el = scrollRefs.current[id]
    if (!el) return

    el.scrollBy({ left: STEP, behavior: 'smooth' })
    setTimeout(() => checkScroll(id), 150)
  }



  const correctText = (el: string, len: number) => {

    return el.slice(0, len - 3) + "..."
  }

  const dishesByMenu = dishes.reduce((acc, dish) => {
    if (!acc[dish.menu_id]) {
      acc[dish.menu_id] = []
    }

    acc[dish.menu_id].push(dish)

    return acc
  }, {} as Record<string, Dish[]>)


  const ddd = (menu ?? []).map((el: Menu) => {
    const filteredDishes = (dishesByMenu[el.id] || []).filter(
      (dish) => dish.is_available)

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
      style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start " }} key={el.id}>
      <h3 className={styles.menuName} ><strong></strong>{el.name}</h3>
      {/* <div style={{ width: "88%", minWidth: "300px", overflowX: "hidden", margin: "0 auto" }}> */}
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
    <div className={styles.container}>

      {/* HERO */}
      <div className={styles.hero}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className={`${styles.slider} ${styles.swiper}`}
          observer={true}
          observeParents={true}
        >
          {services.images.map((src, i) => (
            <SwiperSlide key={i} className={styles.slide}>
              <div className={styles.heroImage}>
                <Image
                  src={src}
                  alt={`slide-${i}`}
                  fill
                  sizes="100%"
                  priority={i === 0}
                  className={styles.img}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.heroOverlay}>
          <h1>{services.name}</h1>

          <div className={styles.meta}>
            <span>⏱ 20–30 мин</span>
            <span>💰 от €10</span>
            <span className={services.is_available ? styles.available : styles.unavailable}>
              {services.is_available ? 'Доступно' : 'Закрыто'}
            </span>
          </div>
        </div>

        <div className={styles.heroActions}>
          <Link
            href={`/admin/services/${services.url_name}/service/${services.id}/edit`}
            className={styles.iconBtn}
          >
            ✏️
          </Link>

          <button
            className={styles.iconBtn}
            onClick={async () => {
              if (!confirm(`Удалить "${services.name}"?`)) return
              await fetch(`/api/dishes?id=${services.id}`, { method: 'DELETE' })
              router.refresh()
            }}
          >
            🗑️
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        <div className={styles.topBlock}>
          <p>{services.description}</p>
          <button className={styles.cta}>Заказать сейчас →</button>
        </div>

        <div className={styles.section}>
          <h2 style={{ fontSize: "25px" }}><strong>Подробнее о услуге </strong></h2>
          <p style={{ fontSize: "23px" }}>{services.full_description}</p>
        </div>

        {/* <div className={styles.infoGrid}>
          <div>⏱ 20–30 мин</div>
          <div>💰 от €10</div>
          <div>🕐 9:00 – 22:00</div>
          <div>🚚 от €15</div>
        </div> */}

        {/* МЕНЮ */}
        <div className={styles.menuSection}>
          <div className={styles.menuHeader}>
            <h2>Меню</h2>
          </div>


          <ul style={{ listStyleType: "none", display: "flex", gap: "10px", flexDirection: "column" }}>
            {ddd}
          </ul>
        </div>

        {/* FEATURES */}
        {/* <div className={styles.features}>
          <div>🌱 Свежие ингредиенты</div>
          <div>🚚 Быстрая доставка</div>
          <div>💳 Удобная оплата</div>
          <div>👨‍🍳 Лучшие повара</div>
        </div> */}
      </div>
    </div>
  )
}