import { getMenus } from "@/services/menuServise"
import MenuList from "../MenuList/MenuList"

export default async function Menus() {
  const menu = await getMenus() // получу все меню и передам на отображение



  return <MenuList menu={menu} />


}