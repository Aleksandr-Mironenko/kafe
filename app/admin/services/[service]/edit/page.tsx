
// import MenuFormEdit from "@/app/components/MenuFormEdit/MenuFormEdit";
import ServiceFormEdit from "@/app/components/ServiceFormEdit/ServiceFormEdit";
import { getMenus } from "@/services/menuServise";
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
  slugs: string[]
}
interface Props {
  serviceId: string
  initialData: InitialData
}
type Menu = {
  url_name: string;
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  created_at: string | null;
  is_available: boolean
  slugs: string[]
}

export const dynamic = "force-dynamic"

export default async function ServiceEdit({ params }: { params: Promise<{ service: string; }> }) {
  const { service } = await params;
  const menus: Menu[] = await getMenus()
  const serviceObj: InitialData = await getServiceByUrlName(service);

  return <ServiceFormEdit serviceId={service} initialData={serviceObj} menus={menus} id={String(serviceObj.id)} />
}

