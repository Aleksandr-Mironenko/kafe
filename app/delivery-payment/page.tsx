// import AdminPage from '@/app/components/AdminPage/AdminPage'
// import { getMenus } from '@/services/menuServise'
// import { getServices } from '@/services/servicesServise'
// import { getReviews } from "@/services/reviewsServise";
// export const dynamic = "force-dynamic"

// export default async function Admin() {

//   const menu = await getMenus() // получу все меню и передам на отображение
//   const services = await getServices() // получу все СЕРВИСЫ и передам на отображение
//   const reviews = await getReviews() // получу все отзывы и передам на отображение
//   console.log('services', services)
//   console.log('menu', menu)
//   console.log('reviews', reviews)

//   return <AdminPage menu={menu} services={services} reviews={reviews} />
// }


// 👉 тебе нужно:

// Завести карточку в Яндекс Бизнес
// Привязать к этому же адресу и телефону
// Добавить сайт



import styles from './pageStyles.module.scss'
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';
// import AdminPage from './admin/page';
// import PageMain from '@/app/components/PageMain/PageMain';
import Menus from '@/app/components/Menus/Menus';
import Content from '@/app/components/Content/Content';
import Basket from '@/app/components/Basket/Basket';
import { getDishes } from "@/services/dishService";
import { getMenuByUrlName } from "@/services/menuServise"
import PostsList from '../components/PostsList/PostsList';
import { getPublicInfo } from '@/services/publicInfoServise';
import DeliveryPayment from '../components/DeliveryPayment/DeliveryPayment';

export const dynamic = "force-dynamic"
type Menu = {
  url_name: string;
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  created_at: string | null;
  is_available: boolean
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
}

export default async function MenuPagesClient({ params }: { params: Promise<{ menu: string }> }) {
  const { menu } = await params;
  console.log(menu, typeof menu)





  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const publicInfo = await getPublicInfo()
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
        <main className={styles.main} >
          <aside className={styles.main__menus_AsideLeft}  >
            <Menus />
          </aside>
          <section className={styles.main__section}  >
            <aside className={styles.main__menus_Aside}  >
              <Menus />
            </aside>
            <div className={styles.main__content} >
              <div className={styles.main__posts}  >
                <DeliveryPayment publicInfo={publicInfo} />
              </div>
              <aside className={styles.main__basket_Aside}  >
                <Basket />
              </aside>
            </div>

          </section>
        </main>
        <Footer />
      </main >
    </>
  );
}
