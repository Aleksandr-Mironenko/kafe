import styles from './policy.module.scss'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { getPublicInfo } from '@/services/publicInfoServise';


export const dynamic = "force-dynamic"
export default async function Home() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const publicInfo = await getPublicInfo()
  const text = (
    <div>
      {/* COOKIE POLICY */}

      <h2>Политика конфиденциальности</h2>

      <p className={styles.pStyle}>Настоящая Политика конфиденциальности составлена в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных пользователей сайта https://bor-food.ru/ (далее - Сайт), а также меры по обеспечению их безопасности.</p>

      <p className={styles.pStyle}>Пользователь, используя Сайт, а также оставляя свои данные на Сайте, подтверждает согласие с настоящей Политикой и условиями обработки персональных данных.</p>

      <h3>1. Оператор персональных данных</h3>

      <p className={styles.pStyle}>Оператором персональных данных является:</p>

      <p className={styles.pStyle}>Индивидуальный предприниматель Транцева Наталья Алексеевна</p>

      <p className={styles.pStyle}>Адрес места нахождения: указать юридический адрес ИП</p>

      <p className={styles.pStyle}>E-mail для обращений по вопросам персональных данных: указать e-mail</p>

      <p className={styles.pStyle}>Ответственный за организацию обработки персональных данных: ФИО, должность (при наличии)</p>

      <h3>2. Персональные данные, которые обрабатываются</h3>

      <p className={styles.pStyle}>Оператор может обрабатывать следующие персональные данные Пользователя:</p>

      <p className={styles.pStyle}>фамилия, имя, отчество;</p>

      <p className={styles.pStyle}>номер телефона;</p>

      <p className={styles.pStyle}>адрес электронной почты;</p>

      <p className={styles.pStyle}>адрес доставки;</p>

      <p className={styles.pStyle}>информация о заказах (состав заказа, сумма, способ получения - доставка или самovывоз);</p>

      <p className={styles.pStyle}>данные, автоматически передаваемые при использовании Сайта: IP-адрес, cookie-файлы, данные браузера, user-agent, дата и время доступа, URL страниц;</p>

      <p className={styles.pStyle}>данные сессии пользователя (session_id);</p>

      <p className={styles.pStyle}>технические данные, связанные с подтверждением действий пользователя (включая коды подтверждения и статус их проверки).</p>

      <h3>3. Цели обработки персональных данных</h3>

      <p className={styles.pStyle}>Персональные данные Пользователя обрабатываются в следующих целях:</p>

      <p className={styles.pStyle}>оформление и выполнение заказов на продукцию общественного питания (доставка и самovывоз);</p>

      <p className={styles.pStyle}>обработка обращений Пользователя через формы на Сайте;</p>

      <p className={styles.pStyle}>направление Пользователю кодов подтверждения и уведомлений;</p>

      <p className={styles.pStyle}>верификация действий Пользователя с использованием кодов подтверждения и session_id;</p>

      <p className={styles.pStyle}>связь с Пользователем по вопросам оформления и выполнения заказов;</p>

      <p className={styles.pStyle}>регистрация и идентификация Пользователя на Сайте;</p>

      <p className={styles.pStyle}>заключение и исполнение гражданско‑правовых договоров (в том числе договоров поставки продукции);</p>

      <p className={styles.pStyle}>ведение учета клиентов, заказов и истории взаимодействия;</p>

      <p className={styles.pStyle}>обеспечение корректной работы Сайта;</p>

      <p className={styles.pStyle}>направление Пользователю информационных и маркетинговых сообщений (при наличии отдельного согласия Пользователя).</p>

      <h3>4. Коды подтверждения и верификация действий</h3>

      <p className={styles.pStyle}>Оператор использует коды подтверждения для подтверждения действий Пользователя на Сайте. Коды подтверждения:</p>

      <p className={styles.pStyle}>генерируются автоматически системой Оператора;</p>

      <p className={styles.pStyle}>направляются Пользователю на указанный адрес электронной почты;</p>

      <p className={styles.pStyle}>используются для подтверждения действий Пользователя (включая оформление заказа);</p>

      <p className={styles.pStyle}>связываются с идентификатором сессии пользователя (session_id), формируемым с использованием cookie-файлов браузера;</p>

      <p className={styles.pStyle}>хранятся в информационной системе Оператора;</p>

      <p className={styles.pStyle}>используются для автоматической проверки корректности введённого Пользователем кода.</p>

      <p className={styles.pStyle}>Проверка корректности кода осуществляется путем сопоставления введенного Пользователем кода с данными, связанными с session_id.</p>

      <h3>5. Маркетинговые рассылки</h3>

      <p className={styles.pStyle}>Оператор вправе направлять Пользователю информационные и маркетинговые сообщения, включая сведения об акциях, скидках, новостях и специальных предложениях.</p>

      <p className={styles.pStyle}>Маркетинговые рассылки осуществляются только при наличии отдельного согласия Пользователя.</p>

      <p className={styles.pStyle}>Пользователь имеет право в любой момент отказаться от получения маркетинговых сообщений, направив уведомление на e-mail Оператора.</p>

      <h3>6. Правовые основания обработки персональных данных</h3>

      <p className={styles.pStyle}>Оператор обрабатывает персональные данные на следующих основаниях:</p>

      <p className={styles.pStyle}>согласие Пользователя на обработку персональных данных;</p>

      <p className={styles.pStyle}>отдельное согласие Пользователя на получение маркетинговых рассылок (при его предоставлении);</p>

      <p className={styles.pStyle}>необходимость исполнения заказа и предоставления услуг;</p>

      <p className={styles.pStyle}>необходимость заключения и исполнения договоров;</p>

      <p className={styles.pStyle}>исполнение обязанностей, предусмотренных законодательством Российской Федерации.</p>

      <h3>7. Порядок обработки персональных данных</h3>

      <p className={styles.pStyle}>Обработка персональных данных включает:</p>

      <p className={styles.pStyle}>сбор;</p>

      <p className={styles.pStyle}>запись;</p>

      <p className={styles.pStyle}>систематизацию;</p>

      <p className={styles.pStyle}>накопление;</p>

      <p className={styles.pStyle}>хранение;</p>

      <p className={styles.pStyle}>уточнение (обновление, изменение);</p>

      <p className={styles.pStyle}>использование;</p>

      <p className={styles.pStyle}>передачу (в том числе на электронную почту Оператора и в информационные системы обработки данных);</p>

      <p className={styles.pStyle}>обезличивание;</p>

      <p className={styles.pStyle}>блокирование;</p>

      <p className={styles.pStyle}>удаление;</p>

      <p className={styles.pStyle}>уничтожение.</p>

      <h3>8. Хранение и защита персональных данных</h3>

      <p className={styles.pStyle}>Оператор принимает необходимые организационные и технические меры для защиты персональных данных Пользователя от неправомерного доступа, изменения, блокирования, копирования, распространения и иных неправомерных действий.</p>

      <p className={styles.pStyle}>Сроки хранения:</p>

      <p className={styles.pStyle}>данные о заказах - 5 лет (в соответствии с законодательством о бухгалтерском учёте);</p>

      <p className={styles.pStyle}>данные для маркетинговых рассылок - до отзыва согласия;</p>

      <p className={styles.pStyle}>технические данные (cookie, session_id) - до 1 года или до удаления Пользователем.</p>

      <p className={styles.pStyle}>Часть данных может храниться локально на устройстве Пользователя (cookie и localStorage браузера) для обеспечения работы Сайта и сохранения пользовательского опыта.</p>

      <h3>9. Передача персональных данных третьим лицам</h3>

      <p className={styles.pStyle}>Персональные данные Пользователя могут передаваться третьим лицам в следующих случаях:</p>

      <p className={styles.pStyle}>для выполнения заказа (службы доставки и партнеры);</p>

      <p className={styles.pStyle}>при использовании сервисов электронной почты и технических систем обработки сообщений;</p>

      <p className={styles.pStyle}>при использовании платежных сервисов (в будущем - эквайринг);</p>

      <p className={styles.pStyle}>в случаях, предусмотренных законодательством Российской Федерации.</p>

      <p className={styles.pStyle}>Трансграничная передача персональных данных не осуществляется, если иное не требуется для выполнения заказа или предоставления услуг.</p>

      <h3>10. Срок хранения персональных данных</h3>

      <p className={styles.pStyle}>Персональные данные хранятся до достижения целей обработки либо до отзыва согласия Пользователем, если иное не предусмотрено законодательством Российской Федерации.</p>

      <h3>11. Права пользователя</h3>

      <p className={styles.pStyle}>Пользователь имеет право:</p>

      <p className={styles.pStyle}>получать информацию о своих персональных данных;</p>

      <p className={styles.pStyle}>требовать их уточнения, блокирования или удаления;</p>

      <p className={styles.pStyle}>отозвать согласие на обработку персональных данных, направив запрос на e-mail Оператора;</p>

      <p className={styles.pStyle}>отказаться от маркетинговых рассылок;</p>

      <p className={styles.pStyle}>требовать прекращения обработки персональных данных;</p>

      <p className={styles.pStyle}>обжаловать действия или бездействие Оператора в Роскомнадзор или в судебном порядке.</p>

      <h3>12. Использование cookie и localStorage</h3>

      <p className={styles.pStyle}>Сайт использует cookie-файлы, localStorage и аналогичные технологии для:</p>

      <p className={styles.pStyle}>идентификации сессии пользователя (session_id);</p>

      <p className={styles.pStyle}>обеспечения работы форм и оформления заказов;</p>

      <p className={styles.pStyle}>сохранения пользовательских данных и улучшения сервиса.</p>

      <p className={styles.pStyle}>Пользователь может отключить cookie в настройках браузера. В этом случае некоторые функции Сайта могут быть недоступны.</p>

      <h3>13. Изменение Политики</h3>

      <p className={styles.pStyle}>Оператор имеет право вносить изменения в настоящую Политику.</p>

      <p className={styles.pStyle}>Актуальная версия Политики всегда доступна на Сайте.</p>

      <h3>14. Заключительные положения</h3>

      <p className={styles.pStyle}>Пользователь подтверждает, что ознакомлен с настоящей Политикой и выражает согласие на обработку персональных данных при использовании Сайта.</p>

      <h2 style={{ marginTop: "40px" }}>  Политика использования файлов cookie</h2>

      <p className={styles.pStyle}>Настоящая Политика использования файлов cookie (далее - Политика) является неотъемлемой частью Политики конфиденциальности сайта https://bor-food.ru/ (далее - Сайт) и определяет порядок использования файлов cookie и аналогичных технологий.</p>

      <p className={styles.pStyle}>Используя Сайт, Пользователь подтверждает своё согласие с настоящей Политикой.</p>

      <h3>1. Что такое cookie</h3>

      <p className={styles.pStyle}>Cookie - это небольшие текстовые файлы, которые сохраняются на устройстве Пользователя при посещении Сайта.</p>

      <p className={styles.pStyle}>Они позволяют обеспечивать корректную работу Сайта.</p>

      <p className={styles.pStyle}>Они позволяют сохранять настройки и предпочтения Пользователя.</p>

      <p className={styles.pStyle}>Они позволяют обеспечивать авторизацию и безопасность.</p>

      <p className={styles.pStyle}>Они позволяют анализировать работу Сайта и улучшать его функциональность.</p>

      <h3>2. Какие cookie мы используем</h3>

      <p className={styles.pStyle}>На Сайте могут использоваться следующие категории cookie: </p>

      <h3>2.1. Технические (обязательные)</h3>

      <p className={styles.pStyle}>Необходимы для корректной работы Сайта. Обеспечивают:</p>

      <p className={styles.pStyle}>авторизацию и идентификацию Пользователя;</p>

      <p className={styles.pStyle}>работу корзины и оформление заказа;</p>

      <p className={styles.pStyle}>сохранение session_id;</p>

      <p className={styles.pStyle}>защиту от мошеннических действий.</p>

      <p className={styles.pStyle}>Эти cookie включаются автоматически и не могут быть отключены.</p>

      <h3>2.2. Функциональные cookie</h3>

      <p className={styles.pStyle}>Используются для:</p>

      <p className={styles.pStyle}>сохранения пользовательских настроек (язык, город, способ доставки);</p>

      <p className={styles.pStyle}>запоминания содержимого корзины;</p>

      <p className={styles.pStyle}>улучшения удобства использования Сайта.</p>

      <h3>2.3. Аналитические и статистические cookie</h3>

      <p className={styles.pStyle}>Помогают анализировать:</p>

      <p className={styles.pStyle}>посещаемость Сайта;</p>

      <p className={styles.pStyle}>поведение Пользователей;</p>

      <p className={styles.pStyle}>эффективность рекламных кампаний.</p>

      <p className={styles.pStyle}>Мы можем использовать сервисы веб‑аналитики (например, Яндекс.Метрика, Google Analytics и др.).</p>

      <p className={styles.pStyle}>Если такие сервисы размещены за пределами РФ, данные могут передаваться за границу в соответствии с требованиями законодательства.</p>

      <h3>2.4. Маркетинговые cookie</h3>

      <p className={styles.pStyle}>Используются для:</p>

      <p className={styles.pStyle}>показа персонализированной рекламы;</p>

      <p className={styles.pStyle}>анализа эффективности рекламных кампаний;</p>

      <p className={styles.pStyle}>формирования персональных предложений.</p>

      <p className={styles.pStyle}>Используются только при наличии отдельного согласия Пользователя.</p>

      <h3>3. Цели использования cookie</h3>

      <p className={styles.pStyle}>Файлы cookie используются для:</p>

      <p className={styles.pStyle}>обеспечения работы и безопасности Сайта;</p>

      <p className={styles.pStyle}>улучшения качества обслуживания;</p>

      <p className={styles.pStyle}>персонализации контента;</p>

      <p className={styles.pStyle}>анализа статистики посещений;</p>

      <p className={styles.pStyle}>предоставления релевантной рекламы (при согласии Пользователя).</p>

      <h3>4. Управление cookie</h3>

      <p className={styles.pStyle}>Пользователь может:</p>

      <p className={styles.pStyle}>разрешить или запретить использование cookie в настройках браузера;</p>

      <p className={styles.pStyle}>удалить ранее сохранённые cookie;</p>

      <p className={styles.pStyle}>ограничить использование сторонних cookie.</p>

      <p className={styles.pStyle}>Однако отключение некоторых cookie может привести к некорректной работе отдельных функций Сайта (например, невозможности оформить заказ).</p>

      <h3>5. Хранение cookie</h3>

      <p className={styles.pStyle}>Срок хранения cookie зависит от их типа:</p>

      <p className={styles.pStyle}>сеансовые cookie - удаляются после закрытия браузера;</p>

      <p className={styles.pStyle}>постоянные cookie - хранятся до 1 года или до момента удаления Пользователем.</p>

      <h3>6. Передача данных третьим лицам</h3>

      <p className={styles.pStyle}>Данные, полученные с помощью cookie, могут передаваться:</p>

      <p className={styles.pStyle}>сервисам веб‑аналитики;</p>

      <p className={styles.pStyle}>службам доставки;</p>

      <p className={styles.pStyle}>платежным сервисам;</p>

      <p className={styles.pStyle}>иным партнёрам, участвующим в работе Сайта.</p>

      <p className={styles.pStyle}>Передача осуществляется только в рамках действующего законодательства РФ.</p>

      <h3>7. Изменение Политики</h3>

      <p className={styles.pStyle}>Оператор вправе вносить изменения в настоящую Политику.</p>

      <p className={styles.pStyle}>Актуальная версия всегда доступна на Сайте.</p>

      <h3>8. Контактная информация</h3>

      <p className={styles.pStyle}>По вопросам, связанным с использованием cookie, Пользователь может обратиться:</p>

      <p className={styles.pStyle}>E-mail: указать e-mail оператора</p>

      <p className={styles.pStyle}>Оператор: Индивидуальный предприниматель Транцева Наталья Алексеевна</p>

      <p className={styles.pStyle}>Адрес: указать юридический адрес ИП</p>

    </div>
  )

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
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >

        <Header publicInfo={publicInfo} />

        <h1 aria-hidden="false" className={styles.visuallyHidden}>
          Кафе и услуги питания в Бору - кейтеринг, банкеты, корпоративное питание
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
        <main className={styles.main}>
          {text}
        </main>
        <Footer />
      </main >
    </>
  );
}
// ✅ Что нужно сделать (обязательно)
// 🔹 1. Добавить сайт в поисковики
// Google Search Console
// Яндекс Вебмастер

// 👉 Там:

// добавить сайт
// отправить sitemap
// запросить индексацию
// 🔹 2. Сделать sitemap.xml

// Пример:

// https://bor-food.ru/sitemap.xml
// 🔹 3. Проверить robots.txt

// Убедись, что нет:

// Disallow: /
// 🔹 4. Добавить title и meta

// На главной странице должно быть:

// <title>Bor Food - доставка еды</title>
// 🔹 5. Добавить упоминания

// Минимум:

// соцсети
// 2–3 ссылки с других сайтов
// ⚡ Важный момент про запрос "bor-food"

// Поисковик может:

// воспринимать это как общий текст
// не связывать с доменом

// 👉 Лучше оптимизировать под:

// bor food
// бор фуд
// bor-food доставка




// максимальная ширина 1950
//ширина основного блока примерно 55- 60%
//слева 15-17%
//справа остаток
// при изменении ширины меняется размер основного блока вбок
// у основного блока есть минимальный и максимальный размер
// при его достижении меняется ширина левого меню
// про достижении определенного размера это меню меняется на меню под шапкой
// справа корзина 2 состояния доставка и самовывоз
// туда с локального хранилища - вопрос как рассчитывать
// переход к оформлению - заполнение формы





//  async function translate(text, from = "en", to = "ru") {
//   const res = await fetch("https://api.mymemory.translated.net/get?q="
//       + encodeURIComponent(text) + `&langpair=${from}|${to}`);

//   const data = await res.json();
//   return data.responseData.translatedText;
// }

// translate("Hello world").then(console.log);
