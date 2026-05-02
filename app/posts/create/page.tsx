import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import ServiceForm from "@/app/components/ServiceForm/ServiceForm";
import { getPublicInfo } from "@/services/publicInfoServise";

export const dynamic = "force-dynamic"

export default async function CreateMenu() {
  const publicInfo = await getPublicInfo()

  return (<>
    <Header publicInfo={publicInfo} />
    <ServiceForm />
    <Footer />
  </>)
  // <DishPage menu={menu} dish={dishObj} />
}

