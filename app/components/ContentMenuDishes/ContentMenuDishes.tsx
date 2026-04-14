"use client"

// import ContentInfoBlock from "../ContentInfoBlock/ContentInfoBlock"
// import ContentMenuDishes from "../ContentMenuDishes/ContentMenuDishes"

import ButtonAdd from "../ButtonAdd/ButtonAdd";
import ButtonDel from "../ButtonDel/ButtonDel";
import Image from "next/image"
// import ButtonAdd from "../ButtonAdd/ButtonAdd";
// import ButtonDelete from "../ButtonDelete/ButtonDelete";
import { useState, useEffect } from "react";

type Menu = {
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
  ingredients?: string
  short_description?: string
  full_description?: string
  weight?: string
  price?: number
  image_url?: string
  order_index?: number
  is_available?: boolean
}
type CartItem = Dish & { quantity: number }

const ContentMenuDishes = ({ menu, dishes }: { menu: Menu[], dishes: Dish[] }) => {
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




  const ddd = menu.map((el: Menu) => {
    const filteredDishes = dishes.filter((dish: Dish) =>
      dish.menu_id === el.id && dish.is_available);

    const arrDishes =
      filteredDishes.map((dish: Dish) => (
        <li style={{ margin: "10px", border: "1px solid black", borderRadius: "8px", position: "relative" }} key={dish.id}>
          {dish.image_url &&
            <div style={{ height: "100px", width: "100px" }}>
              <Image
                style={{ borderRadius: "8px", backgroundColor: "transparent" }}
                width={100}
                height={100}
                src={dish.image_url}
                alt={dish.name} /></div>}
          <p>{dish.name}</p>
          <p>{dish.weight}</p>
          <p>{dish.price}</p>
          <ButtonDel dish={dish} ls={ls} updateCart={updateCart} />
          <ButtonAdd dish={dish} updateCart={updateCart} />

          {/* <button
            onClick={() => addItem(dish)}
            style={{
              position: "absolute",
              right: "5px",
              bottom: "5px",
              width: "44px",
              height: "44px",
              borderRadius: "8px",
              color: "white",
              backgroundColor: "black",
            }}
          >  -
          </button> */}


          {/* <button
            // onClick={() => addItem(dish)}
            style={{
              position: "absolute",
              right: "5px",
              bottom: "5px",
              width: "44px",
              height: "44px",
              borderRadius: "8px",
              color: "white",
              backgroundColor: "black",
            }}
          >
            +
          </button> */}
        </li>
      ))


    return arrDishes.length !== 0 && el.is_available && <li style={{ position: "relative" }} key={el.id}>
      <h3>{el.name}</h3>
      <div style={{ width: "88%", minWidth: "300px", overflowX: "hidden", margin: "0 auto" }}>
        <ul style={{ listStyleType: "none", display: "flex", gap: "15px", flexDirection: "row" }}>{arrDishes}</ul>
      </div >
      <div style={{ position: "absolute", left: "30px", top: "50%", transform: "translateY(-50%)", width: "44px", height: "44px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "black" }}>{`<`}</div>
      <div style={{ position: "absolute", right: "30px", top: "50%", transform: "translateY(-50%)", width: "44px", height: "44px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "black" }}>{`>`}</div>

    </li >

  })

  return <ul style={{ listStyleType: "none", display: "flex", gap: "10px", flexDirection: "column" }}>
    {ddd}
  </ul>
}
export default ContentMenuDishes