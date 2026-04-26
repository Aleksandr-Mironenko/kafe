import styles from './ButtonAdd.module.scss'
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

const ButtonAdd = ({ dish, updateCart, marker }: { dish: Dish, updateCart: (updated: CartItem[]) => void, marker: string }) => {
  const addToCart = () => {
    const stored = localStorage.getItem("cart")
    const cart: CartItem[] = stored ? JSON.parse(stored) : []

    const exists = cart.find(item => item.id === dish.id)

    const updated = exists
      ? cart.map(item =>
        item.id === dish.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      : [...cart, { ...dish, quantity: 1 }]

    updateCart(updated)
  }

  return (
    <button onClick={addToCart} className={`${marker === "+" ? styles.plus : styles.add} `}>
      <div className={`${marker === "+" && styles.plusContent} `} >{marker}</div>
    </button>
  )
}
export default ButtonAdd
