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

const ButtonAdd = ({ dish, updateCart }: { dish: Dish, updateCart: (updated: CartItem[]) => void }) => {
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
    <button onClick={addToCart} style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: "28px",
      width: "30px",
      height: "30px",
      borderRadius: "8px",
      color: "white",
      backgroundColor: "black",
    }}>
      +
    </button>
  )
}
export default ButtonAdd