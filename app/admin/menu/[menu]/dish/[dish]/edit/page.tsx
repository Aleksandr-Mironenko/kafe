import { getDishById } from "@/services/dishService";
// import DishPage from "@/app/components/DishPage/DishPage";
import DishFormEdit from "@/app/components/DishFormEdit/DishFormEdit";
import { getPublicInfo } from "@/services/publicInfoServise";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";

export const dynamic = "force-dynamic"

export default async function DishEdit({ params }: { params: Promise<{ menu: string; dish: string }> }) {
  const { dish, menu } = await params;

  const dishObj = await getDishById(dish)
  const publicInfo = await getPublicInfo()

  return (<>
    <Header publicInfo={publicInfo} />
    <DishFormEdit menuId={menu} dishId={dishObj?.id} initialData={dishObj} />
    <Footer />
  </>)
}

