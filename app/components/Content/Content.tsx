import { getMenus } from "@/services/menuServise"
import { getDishes } from "@/services/dishService"
import ContentInfoBlock from "../ContentInfoBlock/ContentInfoBlock"
import ContentMenuDishes from "../ContentMenuDishes/ContentMenuDishes"

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


export default async function Content() {
  const menu: Menu[] = await getMenus()
  const dishes: Dish[] = []
  for (const el of menu) {
    const elDishes = await getDishes(el.id)
    dishes.push(...elDishes)
  }
  return <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
    <ContentInfoBlock />
    <ContentMenuDishes menu={menu} dishes={dishes} />
  </div>
}