import {
  getDishes,
  // getDishByUrl
} from "@/services/dishService";
import MenuPage from "@/app/components/MenuPage/MenuPage";

export const dynamic = "force-dynamic"

export default async function MenuPages({ params }: { params: Promise<{ menu: string }> }) {
  const { menu } = await params;

  const dishInMenu = await getDishes(menu)
  // const dish = await getDishByUrl(menu)
  return <MenuPage dishes={dishInMenu} menu={menu} />
}
