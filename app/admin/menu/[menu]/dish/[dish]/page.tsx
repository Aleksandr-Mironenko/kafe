import { getDishById } from "@/services/dishService";
import DishPage from "@/app/components/DishPage/DishPage";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import { getPublicInfo } from "@/services/publicInfoServise";

export const dynamic = "force-dynamic"

export default async function Dish({ params }: { params: Promise<{ menu: string; dish: string }> }) {
  const { dish, menu } = await params;

  const dishId = await getDishById(dish)
  const publicInfo = await getPublicInfo()

  return (<>
    <Header publicInfo={publicInfo} />
    <DishPage menu={menu} dish={dishId} />
    <Footer />
  </>)
}


