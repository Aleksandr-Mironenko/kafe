'use client'

import Link from 'next/link'
import styles from './page.module.scss'
import { useRouter } from 'next/navigation'
import PostClient from '../PostClient/PostClient'

type Post = {
  id: string
  name: string
  header: string
  full_description: string
  sort_order: number
  is_available: boolean
  created_at: string
  url_name: string
}

export default function PostPage({ post }: { post: Post }) {
  const router = useRouter()


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href={'/admin/posts'} className={styles.backButton}>
          ← Назад
        </Link>
      </div>

      <PostClient
        header={post.header}
        full_description={post.full_description}
        created_at={post.created_at}
      />

      <div className={styles.actionButtons}>
        {/* EDIT */}
        <Link
          href={`/admin/posts/${post.url_name}/edit`}
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
      </div>
    </div>
  )
}
