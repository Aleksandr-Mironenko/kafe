import Link from "next/link";
import styles from "./MenuList.module.scss"
import ActiveLinkWrapper from "@/app/components/ActiveLinkWrapper/ActiveLinkWrapper"
import Image from "next/image"
type Menu = {
  url_name: string;
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  created_at: string | null;
  is_available: boolean
}

export default async function MenuList({ menu }: { menu: Menu[] }) {
  const menulist = menu.map(menuel => {
    return <li className={styles.li} key={menuel.id}>
      <ActiveLinkWrapper url={`/menu/${menuel.url_name}`}
        className={styles.li}
        activeClass={styles.active}>
        <Link className={styles.li__link} href={`/menu/${menuel.url_name}`} >
          <span className={styles.li__image}>
            {menuel.image_url && (
              <Image
                className={styles.logo}
                src={menuel.image_url}
                alt={menuel.name}
                width={70}
                height={70}
              />
            )}
          </span>
          <h3 className={styles.li__name}>{menuel.name}</h3>
        </Link>
      </ActiveLinkWrapper>
    </li>

  })
  return <ul className={styles.menuList}  >
    {menulist}

  </ul>
}
