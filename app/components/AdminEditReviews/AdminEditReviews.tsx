
import styles from './AdminEditReviews.module.scss'
import Link from "next/link"
import ReviewPage from '@/app/components/ReviewPage/ReviewPage'

interface Review {
  id: string;
  image_url: string;
  created_at: string;
}


const AdminEditReviews = ({ reviews, }: { reviews: Review[] }) => {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Отзывы</h2>
          <Link href={`/admin/reviews/edit`}
            className={styles.editButton}>
            ✏️Редактировать  отзывы
          </Link>
        </div>
        <ReviewPage reviews={reviews} />
      </div >
    </>
  )
}
export default AdminEditReviews