import styles from './PostClient.module.scss'

interface Props {
  header: string
  full_description: string
  created_at: string
}
export default function PostClient({ header, full_description, created_at }: Props) {

  function formatDate(dateString: string) {
    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    // const hours = String(date.getHours()).padStart(2, '0')
    // const minutes = String(date.getMinutes()).padStart(2, '0')

    return ` ${day}.${month}.${year}`

  }
  return (
    <div className={styles.postCard}>
      <h1 className={styles.title}>{header}</h1>

      <div className={styles.section}>

        <p className={styles.text}>{full_description}</p>
      </div>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          {formatDate(created_at)}
        </span>
      </div>
    </div>
  )
}