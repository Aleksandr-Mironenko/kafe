import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import MenuForm from "@/app/components/MenuForm/MenuForm";
import { getPublicInfo } from "@/services/publicInfoServise";

export const dynamic = "force-dynamic"

export default async function CreateMenu() {
  const publicInfo = await getPublicInfo()
  return (<>
    <Header publicInfo={publicInfo} />
    <MenuForm />
    <Footer />
  </>)
  // <DishPage menu={menu} dish={dishObj} />
}