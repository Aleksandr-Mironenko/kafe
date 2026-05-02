import { getPostByUrlName } from "@/services/postsServise"
import PostPage from "@/app/components/PostPage/PostPage"
import { getPublicInfo } from "@/services/publicInfoServise"
import Header from "@/app/components/Header/Header"
import Footer from "@/app/components/Footer/Footer"

export const dynamic = "force-dynamic"

export default async function PostBySlugPage({
  params,
}: {
  params: Promise<{ post: string }>
}) {
  const { post } = await params

  const postData = await getPostByUrlName(post)

  const publicInfo = await getPublicInfo()

  return (<>
    <Header publicInfo={publicInfo} />
    <PostPage post={postData} />
    <Footer />
  </>)
}
