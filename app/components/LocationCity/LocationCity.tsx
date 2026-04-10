import styles from "./LocationCity.module.scss";

export default function Location() {
  return (
    <div className={styles.wrapper} role="button">
      <span
        className={`${styles.icon} iconify i-ri:map-pin-2-fill`}
        aria-hidden="true"
      />

      <div className={styles.text}>
        Нижний Новгород
      </div>
    </div>
  );
}