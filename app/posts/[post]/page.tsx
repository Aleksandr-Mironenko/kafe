import { getServiceByUrlName } from "@/services/servicesServise";
// import AdminPage from "@/app/components/AdminPage/AdminPage";
import ServisePage from "@/app/components/ServisePage/ServisePage";

export const dynamic = "force-dynamic"

export default async function MenuServices({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;

  const serviceInMenu = await getServiceByUrlName(service)
  return <ServisePage services={serviceInMenu} service={service} />

}

