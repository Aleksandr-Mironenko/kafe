
import MenuFormEdit from "@/app/components/MenuFormEdit/MenuFormEdit";
import { getMenuById } from "@/services/menuServise";

export const dynamic = "force-dynamic"

export default async function MenuEdit({ params }: { params: Promise<{ menu: string; }> }) {
  const { menu } = await params;

  const menuObj = await getMenuById(menu);
  return <MenuFormEdit menuId={menu} initialData={menuObj} />
} 