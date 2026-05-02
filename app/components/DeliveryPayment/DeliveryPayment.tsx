import Image from "next/image";
import styles from "./DeliveryPayment.module.scss"
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
export default function DeliveryPayment({ publicInfo }: { publicInfo: PublicInfo }) {
  return (
    <div className={styles.publicInfo}>
      <h1 className={styles.title}>{publicInfo.delivery_payment_title}</h1>

      <p className={styles.content}>
        {publicInfo.delivery_payment_content}
      </p>

      {/* <Image
        className={styles.image}
        src={publicInfo.image_url}
        alt="Public Info Image"
        width={600}
        height={400}
      /> */}
    </div>
  )
}