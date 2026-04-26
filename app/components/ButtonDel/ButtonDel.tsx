import styles from "./ButtonDel.module.scss"

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

const ButtonDel = ({ dish, ls, updateCart }: { dish: Dish, ls: CartItem[], updateCart: (updated: CartItem[]) => void }) => {


  const removeFromCart = () => {
    const stored = localStorage.getItem("cart")
    const cart: CartItem[] = stored ? JSON.parse(stored) : []

    const exists = cart.find(item => item.id === dish.id)
    if (!exists) return

    const updated = exists
      && cart.map(item =>
        (item.id === dish.id && exists.quantity > 0)
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
        .filter(el => el.quantity > 0)

    updateCart(updated)
  }
  const item = ls.find(i => i.id === dish.id)
  const quantity = item?.quantity ?? 0
  return (
    quantity > 0 && <button onClick={removeFromCart} className={styles.minus}  >
      <div className={styles.minusContent}>-</div>
    </button >
  )
}
export default ButtonDel
//    
