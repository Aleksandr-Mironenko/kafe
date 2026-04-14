"use client"
import Image from 'next/image'
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import ButtonAdd from '../ButtonAdd/ButtonAdd';
import { useState, useEffect, useCallback } from 'react';


export type Dish = {
  id: string
  menu_id: string
  weight: string
  name: string
  price?: number
  image_url?: string
  is_available?: boolean
}
type CartItem = Dish & { quantity: number }

const DishesMenu = ({ filteredDishes }: { filteredDishes: Dish[]; searchTerm: string }) => {
  const [existss, setExistss] = useState<CartItem[]>([])
  const [exists, setExists] = useState<boolean>(false)

  const getCard = () => {
    const stored = localStorage.getItem("cart")
    const cart: CartItem[] = stored ? JSON.parse(stored) : []
  }

  useEffect(() => {
    getCard()

  }, [])


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
        <ButtonDelete dish={dish} />
        <ButtonAdd dish={dish} />
      </li>
    ))






  return (
    { arrDishes }
  )
}

export default DishesMenu