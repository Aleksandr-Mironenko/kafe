
// import MenuFormEdit from "@/app/components/MenuFormEdit/MenuFormEdit";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import ServiceFormEdit from "@/app/components/ServiceFormEdit/ServiceFormEdit";
import { getPublicInfo } from "@/services/publicInfoServise";
import { getServiceByUrlName } from "@/services/servicesServise";


interface InitialData {
  id: number
  name: string
  description: string
  full_description: string
  is_available: boolean
  create_at: string
  url_name: string
  images: string[]
}
interface Props {
  serviceId: string
  initialData: InitialData
}


export const dynamic = "force-dynamic"

export default async function ServiceEdit({ params }: { params: Promise<{ service: string; }> }) {
  const { service } = await params;

  const serviceObj: InitialData = await getServiceByUrlName(service);

  const publicInfo = await getPublicInfo()

  return (<>
    <Header publicInfo={publicInfo} />
    <ServiceFormEdit serviceId={service} initialData={serviceObj} />
    <Footer />
  </>)
}

