import { getPostByUrlName } from "@/services/postsServise"
import PostPage from "@/app/components/PostPage/PostPage"

export const dynamic = "force-dynamic"

export default async function PostBySlugPage({
  params,
}: {
  params: Promise<{ post: string }>
}) {
  const { post } = await params

  const postData = await getPostByUrlName(post)

  return <PostPage post={postData} />
}
