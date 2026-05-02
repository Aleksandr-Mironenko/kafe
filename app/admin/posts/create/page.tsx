import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import PostForm from "@/app/components/PostForm/PostForm";
import { getPublicInfo } from "@/services/publicInfoServise";

export const dynamic = "force-dynamic"

export default async function CreatePost() {

  const publicInfo = await getPublicInfo()

  return (<>
    <Header publicInfo={publicInfo} />
    <PostForm />
    <Footer />
  </>)
  // <DishPage menu={menu} dish={dishObj} />
}
