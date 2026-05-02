import {
  getDishes,
  // getDishByUrl
} from "@/services/dishService";
import MenuPage from "@/app/components/MenuPage/MenuPage";
import { getPublicInfo } from "@/services/publicInfoServise";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";

export const dynamic = "force-dynamic"

export default async function MenuPages({ params }: { params: Promise<{ menu: string }> }) {
  const { menu } = await params;

  const dishInMenu = await getDishes(menu)
  // const dish = await getDishByUrl(menu)
  const publicInfo = await getPublicInfo()

  return (<>
    <Header publicInfo={publicInfo} />
    <MenuPage dishes={dishInMenu} menu={menu} />
    <Footer />
  </>)
}
