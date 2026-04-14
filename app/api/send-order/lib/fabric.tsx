"use server";

export type Dish = {
  id: string
  menu_id: string
  name: string
  ingredients?: string
  short_description?: string
  full_description?: string
  weight?: string
  price?: number
  image_url?: string
  order_index?: number
  is_available?: boolean
  quantity: number
}

export default async function fabric(formData: FormData) {
  //  name, phone, email, agree, delivery, order, address




  let name: string = "";
  let phone: string = "";
  let email: string = "";
  let agree: string = "";
  let delivery: string = "";
  let order: Dish[] = [];
  let address: string = "";




  for (const [key, value] of formData.entries()) {



    if (typeof value === "string") {
      if (key === "name") {
        name = value
      } else if (key === "phone") {
        phone = value
      } else if (key === "email") {
        email = value
      } else if (key === "agree") {
        agree = value
      } else if (key === "delivery") {
        delivery = value
      } else if (key === "address") {
        address = value
      }


      else if (key === "order") {
        order = JSON.parse(value as string)
      }
    }
  }





  // const yandexMapsLinkFrom = `https://yandex.ru/maps/?text=${encodeURIComponent(
  //   [adressFrom]
  //     .filter(Boolean)
  //     .join(", ")
  // )}`;

  // const yandexMapsLinkWhere = `https://yandex.ru/maps/?text=${encodeURIComponent(
  //   [adressWhere]
  //     .filter(Boolean)
  //     .join(", ")
  // )}`;

  // const now = new Date();
  // const validTime = (): string => {
  //   const min: number = now.getMinutes();
  //   const minutes = min < 10 ? `0${min}` : String(min)
  //   const h: number = now.getHours();
  //   const hours = h < 10 ? `0${h}` : String(h)
  //   return `${hours + 3}:${minutes}`
  // }
  // const createTime = validTime()




  const normalizedPhone1 =
    phone.replace(/\D/g, '')
      .replace(/^8/, '7')
      .replace(/^7/, '+7')


  return {
    name, phone: normalizedPhone1, email, agree, delivery, order, address
  }
}
