
import styles from './AdminEditPosts.module.scss'
import Link from "next/link"
import { useRouter } from 'next/navigation'

export interface Post {
  id: string
  name: string
  header: string
  full_description: string
  sort_order: number
  is_available: boolean
  created_at: string
  url_name: string
}


const AdminEditPosts = ({ posts }: { posts: Post[] }) => {
  const router = useRouter()

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Посты</h2>

          <Link href={`/admin/posts/create`} className={styles.createButton}>
            + Создать пост
          </Link>
        </div>

        <div className={styles.flex}>
          {(posts || []).map(post => (
            <div key={post.id} className="menuCard">

              <Link href={`/admin/posts/${post.url_name}`}>
                <p style={{ marginTop: '8px', fontWeight: '600', fontSize: '1rem' }}>
                  {post.name}
                </p>
                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  {post.header}
                </p>
              </Link>

              <div className={styles.actionButtons}>

                {/* EDIT */}
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className={`${styles.actionButton} ${styles.edit}`}
                >
                  ✏️
                </Link>

                {/* DELETE */}
                <button
                  onClick={async (e) => {
                    e.preventDefault()
                    if (!confirm(`Удалить пост "${post.name}"?`)) return

                    try {
                      const res = await fetch(`/api/posts?id=${post.id}`, {
                        method: 'DELETE',
                      })

                      const result = await res.json()
                      if (!res.ok) throw new Error(result.error || 'Ошибка при удалении')

                      alert('Пост удалён')
                      router.push('/admin')
                    } catch (err: unknown) {
                      alert(err instanceof Error ? err.message : 'Ошибка')
                    }
                  }}
                  className={`${styles.actionButton} ${styles.delete}`}
                >
                  🗑️
                </button>

                {/* TOGGLE is_available */}
                <label className={styles.toggleSwitch}>
                  <input
                    type="checkbox"
                    checked={post.is_available}
                    onClick={(e) => e.stopPropagation()}
                    onChange={async (e) => {
                      e.stopPropagation()
                      const newValue = e.target.checked

                      try {
                        const res = await fetch('/api/posts', {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            id: post.id,
                            is_available: newValue,
                          }),
                        })

                        const result = await res.json()
                        if (!res.ok) throw new Error(result.error || 'Ошибка')

                        router.refresh()
                      } catch (err: unknown) {
                        alert(err instanceof Error ? err.message : 'Ошибка')
                      }
                    }}
                  />
                  <span className={styles.slider}></span>
                </label>

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default AdminEditPosts