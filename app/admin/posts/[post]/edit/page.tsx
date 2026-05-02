import Footer from "@/app/components/Footer/Footer"
import Header from "@/app/components/Header/Header"
import PostFormEdit from "@/app/components/PostFormEdit/PostFormEdit"
import { getPostByUrlName } from "@/services/postsServise"
import { getPublicInfo } from "@/services/publicInfoServise"

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

  const publicInfo = await getPublicInfo()

  return (<>
    <Header publicInfo={publicInfo} />
    <PostFormEdit postId={postObj.id} initialData={postObj} />
    <Footer />
  </>)
}
