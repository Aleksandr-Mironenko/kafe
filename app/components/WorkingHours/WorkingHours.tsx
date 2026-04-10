import styles from "./WorkingHours.module.scss";

export default function WorkingHours() {
  return (
    <div className={styles.wrapper}>
      <span className={`${styles.icon} iconify i-ri:time-line`} />

      <div className={styles.content}>
        <p className={styles.label}>Время работы</p>
        <p className={styles.value}>09:00 - 20:00</p>
      </div>
    </div>
  );
}