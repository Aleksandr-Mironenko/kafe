// 👉 тебе нужно:

// Завести карточку в Яндекс Бизнес
// Привязать к этому же адресу и телефону
// Добавить сайт



import styles from './styles/pageStyles.module.scss'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AdminPage from './admin/page';

export default function Home() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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

        <Header />

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

        <Footer />
      </main >
    </>
  );
}




//  async function translate(text, from = "en", to = "ru") {
//   const res = await fetch("https://api.mymemory.translated.net/get?q=" 
//       + encodeURIComponent(text) + `&langpair=${from}|${to}`);

//   const data = await res.json();
//   return data.responseData.translatedText;
// }

// translate("Hello world").then(console.log);
