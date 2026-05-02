import styles from "./WorkingHours.module.scss";

export default function WorkingHours({ hours }: { hours: string }) {
  return (
    <div className={styles.wrapper}>
      <span className={`${styles.icon} iconify i-ri:time-line`} />

      <div className={styles.content}>
        <p className={styles.label}>Время работы</p>
        <p className={styles.value}>{hours}</p>
      </div>
    </div>
  );
}