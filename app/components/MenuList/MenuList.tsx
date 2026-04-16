import Link from "next/link";
import styles from "./MenuList.module.scss"
type Menu = {
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
      <Link href={`/menu/${menuel.id}`} key={menuel.id}>
        <h3>{menuel.name}</h3>
      </Link>
    </li>
    return
  })
  return <ul style={{ listStyle: 'none', padding: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
    {menulist}

  </ul>
}