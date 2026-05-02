
// import MenuFormEdit from "@/app/components/MenuFormEdit/MenuFormEdit";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import ReviewFormEdit from "@/app/components/ReviewFormEdit/ReviewFormEdit";
import { getPublicInfo } from "@/services/publicInfoServise";
import { getReviews } from "@/services/reviewsServise";


type Review = {
  id: string;
  image_url: string;
  created_at: string;
}


export const dynamic = "force-dynamic"

export default async function ServiceEdit() {


  const reviewsArrObj: Review[] = await getReviews();

  const publicInfo = await getPublicInfo()

  return (<>
    <Header publicInfo={publicInfo} />
    <ReviewFormEdit initialData={reviewsArrObj} />
    <Footer />
  </>)
}