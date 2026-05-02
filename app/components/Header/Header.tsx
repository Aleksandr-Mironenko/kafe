// style="text-shadow: 1px 1px 1px #c15639;font-weight:900; color:#c15639"
import styles from "./Header.module.scss";
import logo from "@/public/redFood.svg";
import Image from "next/image";
import Link from "next/link";
import WorkingHours from "../WorkingHours/WorkingHours";
import PhoneLink from "../PhoneLink/PhoneLink";
import LocationCity from "../LocationCity/LocationCity";
interface PublicInfo {
  id: string,
  city: string,
  address_url: string,
  phone: string,
  schedule: string,
  title: string,
  content: string,
  image_url: string,
  url_link: string,
  updated_at: string,
  delivery_payment_title: string,
  delivery_payment_content: string
}
export default function Header({ publicInfo }: { publicInfo: PublicInfo }) {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <nav className={styles.header__nav}>
          <a href="/">       {/*https://bor-food.ru/ */}
            <Image
              className={styles.header__logo}
              src={logo}
              alt="Логотип компании"
              width={70}
              height={70}
              priority
              style={{ minWidth: "70px", minHeight: "70px" }}
            />
          </a>
          <div className={styles.header__info_top}>
            <a href="https://bor-food.ru/">
              <Image
                className={styles.header__info_top_logo}
                src={logo}
                alt="Логотип компании"
                width={44}
                height={44}
                priority
              />
            </a>
            <WorkingHours hours={publicInfo.schedule} />
            <PhoneLink phone={publicInfo.phone} />
            <LocationCity city={publicInfo.city} address={publicInfo.address_url} />
          </div>
          <div className={styles.header__nav_menu}>
            <Link href="/delivery-payment" className={styles.header__nav_link}>
              Доставка и оплата
            </Link>
          </div>

          <div className={styles.header__nav_menu}>
            <Link href="/posts" className={styles.header__nav_link}>
              Статьи </Link>
          </div>
          <div className={styles.header__nav_menu}>
            <Link href="/services" className={styles.header__nav_link}>
              Услуги </Link>
          </div>
          <div
            className={`${styles.header__nav_menu} ${styles.header__nav_menuSearch}`}
          >
            <input

              type="search"
              placeholder="Поиск в меню "
              autoComplete="off"
              required
              className={styles.input}
            />
          </div>
          {/* <div className={styles.header__info}>
              <WorkingHours />
              <PhoneLink />
              <LocationCity />
            </div> */}
          <div className={`${styles.header__nav_menu} ${styles.header__nav_menuBig} ${styles.header__nav_menuSearch}`}>
            <WorkingHours hours={publicInfo.schedule} />
          </div>
          <div className={`${styles.header__nav_menuBig} ${styles.header__nav_menuSearch}`}>
            <PhoneLink phone={publicInfo.phone} />
          </div>
          <div className={`${styles.header__nav_menuBig} ${styles.header__nav_menuSearch}`}>
            <LocationCity city={publicInfo.city} address={publicInfo.address_url} />
          </div>



        </nav>
      </div >
    </header >

  );
} 