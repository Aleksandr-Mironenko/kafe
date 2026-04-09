import { getDishes } from "@/services/dishService";
import MenuPage from "@/app/components/MenuPage/MenuPage";

export default async function MenuPages({ params }: { params: Promise<{ menu: string }> }) {
  const { menu } = await params;

  const dishInMenu = await getDishes(menu)
  return <MenuPage dishes={dishInMenu} menu={menu} />
}
