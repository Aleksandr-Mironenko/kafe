// import styles from "./Footer.module.scss";

// export default function Footer() {
//   return (
//     <footer id="contacts" className={styles.footer}>
//       <a href="/Kantar.pdf"
//         rel="noopener"
//         target="_blank"
//       > <div className={styles.footer__copyright}>
//           © 2022-2026 KANTAR Logistics
//         </div>
//       </a>

//       <div className={styles.footer__links}>
//         <a href="/rkn.pdf"
//           rel="noopener"
//           target="_blank"        >
//           Политика конфиденциальности</a>
//         <a href="/policy"
//           rel="noopener"
//           target="_blank"
//         >Пользовательское соглашение</a>
//       </div>
//     </footer>
//   );
// }


// ssr

import Image from "next/image";
import styles from "./Footer.module.scss";
import stars from '@/public/star-reviews.svg'
export default function Footer() {
  return (
    <>
      {/* Schema.org Organization — SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Kantar Logistic — Кантар Логистик",
            url: "https://kantar-logistics.ru/",
            logo: "https://kantar-logistics.ru/logo.png",
            description:
              "Международные перевозки, логистика, доставка грузов по России, Европе, Азии и миру.",
            address: {
              "@type": "PostalAddress",
              addressCountry: "RU",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+7-910-105-64-23",
              contactType: "customer service",
            },
            sameAs: [
              "https://t.me/kantar",
              "https://vk.com/kantar",
            ],
          }),
        }}
      />


      <footer id="contacts" className={styles.footer} aria-label="Футер сайта">
        <div className={styles.footer__wrapper}>

          <div className={styles.footer__left}>
            <a
              href="/reviews"
              rel=" "
              target="_blank"
              className={styles.reviews_block}
            >


              <Image
                className={styles.logo}
                src={stars}
                alt="rewiews"
                width={15}
                height={15}
              />


              <h3 itemProp="copyrightHolder" className={styles.li__name}>Отзывы</h3>
            </a>
            <a
              href="https://www.sravni.ru/kontragent/524600609359/finance/"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.footer__copyright}
            >
              <span itemProp="copyrightHolder">© 2014–2026 BOR FOOD</span>
            </a>


            <div />
          </div>
          <a
            href="/reviews"
            rel=" "
            target="_blank"
            className={styles.reviews}
          >


            <Image
              className={styles.logo}
              src={stars}
              alt="rewiews"
              width={15}
              height={15}
            />


            <h3 itemProp="copyrightHolder" className={styles.li__name}>Отзывы</h3>
          </a>



          <nav className={styles.footer__links} aria-label="Юридическая информация">
            <a
              href="/rkn.pdf"
              rel="noopener noreferrer"
              target="_blank"
            >
              Политика конфиденциальности
            </a>

            <a
              href="/policy"
              rel="noopener noreferrer"
              target="_blank"
            >
              Пользовательское соглашение
            </a>
          </nav>
        </div>

      </footer>
    </>
  );
}
