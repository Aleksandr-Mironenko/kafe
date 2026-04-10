import styles from "./Header.module.scss";
import logo from "@/public/logo-black-svg (1).svg";
import Image from "next/image";
import Link from "next/link";
import WorkingHours from "../WorkingHours/WorkingHours";
import PhoneLink from "../PhoneLink/PhoneLink";
import LocationCity from "../LocationCity/LocationCity";



export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <nav className={styles.header__nav}>
          <a className="tn-atom" href="https://kantar-logistics.ru/">
            <Image
              className={styles.header__logo}
              src={logo}
              alt="Логотип компании"
              width={171}
              height={60}
              priority
            />
          </a>

          <div className={styles.header__nav_menu}>
            <Link href="/services" className={styles.header__nav_link}>
              Доставка и оплата
            </Link>
          </div>

          <div className={styles.header__nav_menu}>
            <Link href="/services" className={styles.header__nav_link}>
              Статьи </Link>
          </div>
          <div className={styles.header__nav_menu}>
            <Link href="/services" className={styles.header__nav_link}>
              Услуги </Link>
          </div>
          <div className={styles.header__nav_menu}>
            <input
              type="search"
              placeholder="Поиск по меню"
              autoComplete="off"
              required
              className={styles.input}
            />
          </div>

          <WorkingHours />
          <PhoneLink />
          <LocationCity />
          <div className={styles.header__nav_menu}>
            {/* <Link href="/services" className={styles.header__nav_link}>
              УСЛУГИ
            </Link> */}

            {/* <Link href="/info" className={styles.header__nav_link}>
              О НАС
            </Link> */}

            {/* <Link href="/contacts" className={styles.header__nav_link}>
              КОНТАКТЫ
            </Link> */}

            {/* Клиентский компонент — плавный скролл */}



            {/* Клиентский компонент — логин/логаут */}

          </div>
        </nav>
      </div >
    </header >

  );
} 