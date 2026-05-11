
// import MenuFormEdit from "@/app/components/MenuFormEdit/MenuFormEdit";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import ServiceFormEdit from "@/app/components/ServiceFormEdit/ServiceFormEdit";
import { getMenus } from "@/services/menuServise";
import { getPublicInfo } from "@/services/publicInfoServise";
import { getServiceByUrlName } from "@/services/servicesServise";
import styles from "./pageStyles.module.scss"

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
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const publicInfo = await getPublicInfo()
  return (<main
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}
  >

    <Header publicInfo={publicInfo} />

    <h1 aria-hidden="false" className={styles.visuallyHidden}>
      Кафе и услуги питания в Бору — кейтеринг, банкеты, корпоративное питание
    </h1>


    {/* <AdminPage /> */}
    <section  >
      <h2 className={styles.visuallyHidden}>
        Организация питания: кафе, выездное обслуживание и питание для организаций
      </h2>
      <p className={styles.visuallyHidden}>
        ИП Транцева Наталья Алексеевна оказывает услуги общественного питания в городе Бор и Нижегородской области. Основные направления - работа кафе, организация мероприятий и выездное обслуживание.
        В кафе можно ежедневно пообедать, провести встречу или заказать питание для небольшой компании. Предлагаются блюда домашней кухни, доступные по цене и подходящие для регулярного посещения.
        Осуществляется организация мероприятий: корпоративы, банкеты, поминальные обеды и семейные торжества. Подбирается меню, учитываются формат мероприятия и количество гостей.
        Доступен выездной кейтеринг - приготовление и доставка блюд на площадку заказчика с обслуживанием.
        Для организаций предлагается питание сотрудников по договору: регулярные поставки готовых обедов или организация питания на территории заказчика.
      </p>
    </section>
    <ServiceFormEdit serviceId={service} initialData={serviceObj} menus={menus} id={String(serviceObj.id)} />

    <Footer />
  </main >
  )

}




//     .wrapper {
//   height: 75vh;
// }
//   <div className={styles.wrapper}></div>
// } <h2 style={{ textAlign: "center" }}><strong>Редактируем меню</strong></h2>