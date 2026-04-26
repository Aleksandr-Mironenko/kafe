
// import MenuFormEdit from "@/app/components/MenuFormEdit/MenuFormEdit";
import ServiceFormEdit from "@/app/components/ServiceFormEdit/ServiceFormEdit";
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

  return <ServiceFormEdit serviceId={service} initialData={serviceObj} />
}

