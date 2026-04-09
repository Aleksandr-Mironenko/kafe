import { getDishById } from "@/services/dishService";
// import DishPage from "@/app/components/DishPage/DishPage";
import DishFormEdit from "@/app/components/DishFormEdit/DishFormEdit";

export const dynamic = "force-dynamic"

export default async function DishEdit({ params }: { params: Promise<{ menu: string; dish: string }> }) {
  const { dish, menu } = await params;

  const dishObj = await getDishById(dish)
  return <DishFormEdit menuId={menu} dishId={dishObj?.id} initialData={dishObj} />
  // <DishPage menu={menu} dish={dishObj} />
}



{/* <DishFormEdit menuId={menu} dishId={dishObj?.id as string} initialData={dishObj as Dish} /> */ }