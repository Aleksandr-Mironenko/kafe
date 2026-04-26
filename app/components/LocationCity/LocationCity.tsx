import styles from "./LocationCity.module.scss";

export default function Location() {
  return (
    <div className={styles.wrapper} role="button">
      <p className={styles.text}>Город</p>

      <div className={styles.value}>
        <a href="https://yandex.kz/maps/20037/bor/house/ulitsa_neklyudovo_1/YE0YdgdmTkYFQFtsfXhxdX1iYQ==/?ll=44.006719%2C56.404102&utm_campaign=desktop&utm_medium=search&utm_source=maps&z=18.29" target="_blank">Бор</a>
      </div>


    </div>
  );
}



<div className={styles.wrapper}>
  <p className={styles.icon}>Город</p>

  <div className={styles.text}>
    <a href="https://yandex.kz/maps/20037/bor/house/ulitsa_neklyudovo_1/YE0YdgdmTkYFQFtsfXhxdX1iYQ==/?ll=44.006719%2C56.404102&utm_campaign=desktop&utm_medium=search&utm_source=maps&z=18.29" target="_blank">Бор</a>
  </div>

</div >