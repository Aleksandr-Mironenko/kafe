import PostFormEdit from "@/app/components/PostFormEdit/PostFormEdit"
import { getPostByUrlName } from "@/services/postsServise"

interface InitialData {
  id: string
  name: string
  header: string
  full_description: string
  sort_order: number
  is_available: boolean
  created_at: string
  url_name: string
}

export const dynamic = "force-dynamic"

export default async function PostEdit({
  params,
}: {
  params: Promise<{ post: string }>
}) {
  const { post } = await params

  const postObj: InitialData = await getPostByUrlName(post)

  return <PostFormEdit postId={postObj.id} initialData={postObj} />
}
