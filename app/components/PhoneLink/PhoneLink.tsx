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
        <a href="tel:+79616385060">
          <div
            // disabled={0()}
            className={styles.value}>
            <p>+7 961 638 50 60</p>
          </div>
        </a>
      </div>
    </a>
  );
}
