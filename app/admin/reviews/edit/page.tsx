
// import MenuFormEdit from "@/app/components/MenuFormEdit/MenuFormEdit";
import ReviewFormEdit from "@/app/components/ReviewFormEdit/ReviewFormEdit";
import { getReviews } from "@/services/reviewsServise";


type Review = {
  id: string;
  image_url: string;
  created_at: string;
}


export const dynamic = "force-dynamic"

export default async function ServiceEdit() {


  const reviewsArrObj: Review[] = await getReviews();

  return <ReviewFormEdit initialData={reviewsArrObj} />
}

