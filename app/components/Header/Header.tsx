// style="text-shadow: 1px 1px 1px #c15639;font-weight:900; color:#c15639"
import styles from "./Header.module.scss";
import logo from "@/public/redFood.svg";
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
          <a href="https://bor-food.ru/">
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
            <WorkingHours />
            <PhoneLink />
            <LocationCity />
          </div>
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
          <div className={`${styles.header__nav_menu} ${styles.header__nav_menuBig}`}>
            <WorkingHours />
          </div>
          <div className={styles.header__nav_menuBig}>
            <PhoneLink />
          </div>
          <div className={styles.header__nav_menuBig}>
            <LocationCity />
          </div>



        </nav>
      </div >
    </header >

  );
} 