import ServiceForm from "@/app/components/ServiceForm/ServiceForm";
import { getPublicInfo } from "@/services/publicInfoServise";
import styles from "./pageStyles.module.scss"
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";

export const dynamic = "force-dynamic"

export default async function CreateMenu() {
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
    <ServiceForm />

    <Footer />
  </main >
  )

  // <DishPage menu={menu} dish={dishObj} />
}

