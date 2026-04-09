import styles from './styles/pageStyles.module.scss'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AdminPage from './admin/page';

export default function Home() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <>
      {/* Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Kantar Logistic — Кантар Логистик",
            url: BASE_URL,
            description:
              "Kantar Logistic — международная логистическая компания, выполняющая грузоперевозки по России, Европе и Азии.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+7-910-105-64-23",
              contactType: "customer service",
              email: "kantarlog@mail.ru",
            },
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

      {/*  <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
         <Header />
        <h1 aria-hidden="false" className={styles.visuallyHidden}>
          Международные грузоперевозки Kantar Logistic — логистика, доставка грузов, транспортные решения по России, Европе и Азии
        </h1>


        <AdminPage />
        <section  >
          <h2 className={styles.visuallyHidden}>
            Логистическая компания Kantar Logistic — международные перевозки
          </h2>
          <p className={styles.visuallyHidden}>
            Kantar Logistic — международная логистическая компания, выполняющая перевозки коммерческих грузов, личных вещей и сборных отправлений по России, Европе и Азии. Мы предлагаем комплексные транспортные решения, включая подбор оптимального маршрута, страхование, таможенное оформление и доставку «до двери».
          </p>
        </section>

        <Footer />
      </main > */}
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
