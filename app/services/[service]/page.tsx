import { getServiceByUrlName } from "@/services/servicesServise";
// import AdminPage from "@/app/components/AdminPage/AdminPage";
import ServisePage from "@/app/components/ServisePage/ServisePage";
import ServiseUserPage from "@/app/components/ServiseUserPage/ServiseUserPage";
import { getPublicInfo } from "@/services/publicInfoServise";
import styles from './pageStyles.module.scss'
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';
import Menus from '@/app/components/Menus/Menus';
import Basket from '@/app/components/Basket/Basket';
import { getMenusBySlug } from "@/services/menuServise";
import { getDishesBySlug } from "@/services/dishService";
export const dynamic = "force-dynamic"


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

export type Dish = {
  id: string
  menu_id: string
  name: string
  ingredients: string
  short_description?: string
  full_description?: string
  weight?: string
  price: number
  image_url?: string
  order_index?: number
  is_available?: boolean
  slugs: string[]
}

type Service = {
  id: number
  name: string
  description: string
  full_description: string
  is_available: boolean
  created_at: string | null
  url_name: string
  images: string[]
}
export default async function MenuServices({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;

  const serviceInMenu: Service = await getServiceByUrlName(service)
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const publicInfo = await getPublicInfo()
  // console.log(publicInfo)
  const idServiceString = String(serviceInMenu.id)

  const menuAndService = await getMenusBySlug(idServiceString)
  const ids = menuAndService.map(el => el.id)
  const dishAndService = await getDishesBySlug(idServiceString, ids)

  console.log("то что я хотел увидеть в строке 64", menuAndService)
  console.log("то что я хотел увидеть в строке 65", dishAndService)



  return (
    <>
      {/* Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FoodEstablishment",
            name: "Кафе и услуги питания в Бору",
            url: BASE_URL,
            areaServed: "Бор, Нижегородская область",
            address: {
              "@type": "PostalAddress",
              streetAddress: "ул. Неклюдово, 1",
              addressLocality: "Бор",
              addressRegion: "Нижегородская область",
              addressCountry: "RU",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 56.404115,
              longitude: 44.006722,
            },
            servesCuisine: "Русская кухня",
            openingHours: "Mo-Su 09:00-20:00",
            priceRange: "₽₽",
            description:
              "Кафе, кейтеринг и организация питания в городе Бор: банкеты, поминки, корпоративное питание",
            telephone: "+7-961-638-50-60",
            email: "n.tranceva@mail.ru",
          }),
        }}
      />
      {/* Legal Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ИП Транцева Наталья Алексеевна",
          }),
        }}
      />
      {/* WebSite + SearchAction */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: BASE_URL,
            potentialAction: {
              "@type": "SearchAction",
              target: `${BASE_URL}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: `${BASE_URL}/`,
              },
            ],
          }),
        }}
      />

      <main
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


        <ServiseUserPage services={serviceInMenu} menu={menuAndService} dishes={dishAndService} />

        <Footer />
      </main >
    </>
  );
}


// function getDishesBySlugs(service: string, menus: Menu[]): Dish[] | PromiseLike<Dish[]> {
//   throw new Error("Function not implemented.");
// }

