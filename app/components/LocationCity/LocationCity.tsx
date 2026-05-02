import styles from "./LocationCity.module.scss";

export default function LocationCity({ city, address }: { city: string, address: string }) {
  return (
    <div className={styles.wrapper} role="button">
      <p className={styles.text}>Город</p>

      <div className={styles.value}>
        <a href={address} target="_blank">
          {city}
        </a>
      </div>


    </div>
  );
}


