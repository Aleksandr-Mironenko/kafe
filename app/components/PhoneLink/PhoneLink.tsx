import styles from "./PhoneLink.module.scss";

export default function PhoneLink({ phone }: { phone: string }) {
  return (
    <a
      href={`tel:${phone}`}
      target="_blank"
      className={styles.link}
    >
      <span
        className={`${styles.icon} iconify i-ri:phone-fill`}
        aria-hidden="true"
      />

      <div className={styles.content}>
        <p className={styles.label}>Телефон</p>
        <a href={`tel:${phone}`}>
          <div
            // disabled={0()}
            className={styles.value}>
            <p>{phone}</p>
          </div>
        </a>
      </div>
    </a>
  );
}
