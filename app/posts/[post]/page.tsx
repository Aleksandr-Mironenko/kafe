import { getServiceByUrlName } from "@/services/servicesServise";
// import AdminPage from "@/app/components/AdminPage/AdminPage";
import ServisePage from "@/app/components/ServisePage/ServisePage";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import { getPublicInfo } from "@/services/publicInfoServise";

export const dynamic = "force-dynamic"

export default async function MenuServices({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;

  const serviceInMenu = await getServiceByUrlName(service)
  const publicInfo = await getPublicInfo()

  return (<>
    <Header publicInfo={publicInfo} />
    <ServisePage services={serviceInMenu} service={service} />
    <Footer />
  </>)

}

