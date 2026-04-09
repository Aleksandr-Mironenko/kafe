import DishForm from "@/app/components/DishForm/DishForm";

export const dynamic = "force-dynamic"

export default async function DishEdit({ params }: { params: Promise<{ menu: string; dish: string }> }) {
  const { menu } = await params;


  return <DishForm menuId={menu} />
  // <DishPage menu={menu} dish={dishObj} />
}