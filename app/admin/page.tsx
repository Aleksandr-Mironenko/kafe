import AdminPage from '@/app/components/AdminPage/AdminPage'
import { getMenus } from '@/services/menuServise'

export const dynamic = "force-dynamic"

export default async function Admin() {

  const menu = await getMenus() // получу все меню и передам на отображение

  return <AdminPage menu={menu} />
}
