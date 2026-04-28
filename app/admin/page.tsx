import AdminPage from '@/app/components/AdminPage/AdminPage'
import { getMenus } from '@/services/menuServise'
import { getServices } from '@/services/servicesServise'
import { getReviews } from "@/services/reviewsServise";
export const dynamic = "force-dynamic"

export default async function Admin() {

  const menu = await getMenus() // получу все меню и передам на отображение
  const services = await getServices() // получу все СЕРВИСЫ и передам на отображение
  const reviews = await getReviews() // получу все отзывы и передам на отображение
  console.log('services', services)
  console.log('menu', menu)
  console.log('reviews', reviews)

  return <AdminPage menu={menu} services={services} reviews={reviews} />
}
