import PostClient from '@/app/components/PostClient/PostClient'
import { getPosts } from '@/services/postsServise'
export type Post = {
  id: string
  name: string
  header: string
  full_description: string
  sort_order: number
  is_available: boolean
  created_at: string
  url_name: string
}

export default async function PostsList() {
  const posts: Post[] = await await getPosts()
  return (
    <ul > {posts.map(post => (
      <li key={post.id}>
        <PostClient header={post.header} full_description={post.full_description} created_at={post.created_at} />
      </li>
    ))}</ul>


  )
}