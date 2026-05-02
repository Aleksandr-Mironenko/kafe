
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import MenuFormEdit from "@/app/components/MenuFormEdit/MenuFormEdit";
import { getMenuById } from "@/services/menuServise";
import { getPublicInfo } from "@/services/publicInfoServise";

export const dynamic = "force-dynamic"

export default async function MenuEdit({ params }: { params: Promise<{ menu: string; }> }) {
  const { menu } = await params;

  const menuObj = await getMenuById(menu);
  const publicInfo = await getPublicInfo()

  return (<>
    <Header publicInfo={publicInfo} />
    <MenuFormEdit menuId={menu} initialData={menuObj} />
    <Footer />
  </>)
}

