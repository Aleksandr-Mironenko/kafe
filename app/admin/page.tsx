import AdminPage from '@/app/components/AdminPage/AdminPage'
import { getMenus } from '@/services/menuServise'
import { getServices } from '@/services/servicesServise'
import { getReviews } from "@/services/reviewsServise";
import { getPosts } from '@/services/postsServise';
import { getPublicInfo } from '@/services/publicInfoServise';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
export const dynamic = "force-dynamic"

export default async function Admin() {

  const menu = await getMenus() // получу все меню и передам на отображение
  const services = await getServices() // получу все СЕРВИСЫ и передам на отображение
  const reviews = await getReviews() // получу все отзывы и передам на отображение
  const posts = await getPosts() // получу все посты и передам на отображение
  const publicInfo = await getPublicInfo() //все публичные поля которые потом можно легко поменять



  return (<>
    <Header publicInfo={publicInfo} />
    <div style={{ minHeight: "76vh" }}>
      <AdminPage menu={menu} services={services} reviews={reviews} posts={posts} publicInfo={publicInfo} />
    </div>
    <Footer />
  </>)
}
