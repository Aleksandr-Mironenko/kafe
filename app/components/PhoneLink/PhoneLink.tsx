import styles from "./PhoneLink.module.scss";

export default function PhoneLink() {
  return (
    <a
      href="tel:2351514"
      target="_blank"
      className={styles.link}
    >
      <span
        className={`${styles.icon} iconify i-ri:phone-fill`}
        aria-hidden="true"
      />

      <div className={styles.content}>
        <p className={styles.label}>Телефон</p>
        <p className={styles.value}>235-15-14</p>
      </div>
    </a>
  );
}