import { getMenus } from "@/services/menuServise"
import { getDishes } from "@/services/dishService"
import ContentInfoBlock from "../ContentInfoBlock/ContentInfoBlock"
import ContentOneMenuDishes from "../ContentOneMenuDishes/ContentOneMenuDishes"
import ContentMenuDishes from "@/app/components/ContentMenuDishes/ContentMenuDishes"
import styles from "./Content.module.scss"
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


export default async function Content({ dishProps, menuProps }: { dishProps?: Dish[], menuProps?: Menu }) {
  console.log(dishProps)
  let menu: Menu[] = []
  if (menuProps === undefined) {
    menu = await getMenus()
  } else {
    menu = [menuProps]
  }
  let dishes: Dish[] = []

  if (dishProps === undefined) {
    for (const el of menu) {
      const elDishes = await getDishes(el.id)
      dishes.push(...elDishes)
    }
  } else {
    dishes = [...dishes, ...dishProps]
  }
  return <div className={styles.content}  >
    {(dishProps === undefined) && (<>
      <ContentInfoBlock />
      <div style={{ alignSelf: "center" }}>
        <ContentMenuDishes menu={menu} dishes={dishes} />
      </div>

    </>)
    }
    <div style={{ alignSelf: "center" }}>
      <ContentOneMenuDishes menu={menu} dishes={dishes} />
    </div>
  </div >
}

