import DishForm from "@/app/components/DishForm/DishForm";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import { getPublicInfo } from "@/services/publicInfoServise";

export const dynamic = "force-dynamic"

export default async function DishEdit({ params }: { params: Promise<{ menu: string; dish: string }> }) {
  const { menu } = await params;
  const publicInfo = await getPublicInfo()

  return (<>
    <Header publicInfo={publicInfo} />
    <DishForm menuId={menu} />
    <Footer />
  </>)
  // <DishPage menu={menu} dish={dishObj} />
}

