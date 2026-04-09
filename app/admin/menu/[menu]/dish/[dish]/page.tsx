import { getDishById } from "@/services/dishService";
import DishPage from "@/app/components/DishPage/DishPage";

export const dynamic = "force-dynamic"

export default async function Dish({ params }: { params: Promise<{ menu: string; dish: string }> }) {
  const { dish, menu } = await params;

  const dishId = await getDishById(dish)
  return <DishPage menu={menu} dish={dishId} />
}
