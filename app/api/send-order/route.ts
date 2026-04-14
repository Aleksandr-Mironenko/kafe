import { NextResponse } from "next/server";
import { sendEmail } from "@/app/api/lib/email/sendEmail";
import { sendSMS } from "@/app/api/lib/sms-message/sendSms";
import fabric from "./lib/fabric";

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

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const { name, phone, email, agree, delivery, order, address } = await fabric(formData);

    if (!agree) {
      return NextResponse.json({ error: "User did not agree" }, { status: 400 });
    }

    const tasks: Promise<void>[] = [];



    const mapPlaces = order.map((el: Dish) => (
      `
   
        <li style="display:flex; flex-direction:row; gap:10px; margin-bottom:15px;">
          <img src="${el.image_url || '/pagefood.png'}" alt="${el.name}" width="80" height="80" style="border-radius:8px"/>
          <div style="display:flex; flex-direction:column; gap:5px;">
            <p style="font-weight:bold; margin:0;">${el.name}</p>
            <div style="display:flex; align-items:center; justify-content:center; width:40px; font-size:15px; border:1px solid #ccc; border-radius:5px;">
              ${el.quantity}
            </div>
            ${el.short_description ? `<p style="margin:0;">${el.short_description}</p>` : ""}
            ${el.full_description ? `<p style="margin:0;">${el.full_description}</p>` : ""}
            ${el.ingredients ? `<p style="margin:0;">${el.ingredients}</p>` : ""}
            ${el.price ? `<p style="margin:0;">Цена: ${el.price}</p>` : ""}
            ${el.weight ? `<p style="margin:0;">Вес: ${el.weight}</p>` : ""}
          </div>
        </li>
      `
    )
    ).join('')

    // --- HTML для админа ---
    const ordersAdminHtml = `<ul style='padding:0; list-style:none'>";
      ${mapPlaces}
    </ul>

     `;

    const messageAdmin = `
      <div style="font-family:Arial, sans-serif; font-size:15px; line-height:1.4; color:#333;">
        <p>Имя клиента: ${name}</p>
        <p>Телефон: ${phone}</p>
        <p>Email: ${email}</p>
        ${delivery === "Доставка" ? `<p>Доставка по адресу: ${address}</p>` : "<p>Самовывоз</p>"}
        <p>Заказанные позиции:</p>
        ${ordersAdminHtml}
      </div>
    `;


    const mapPlaces2 = order.map((el: Dish) => (
      `
   
      <li style="display:flex; flex-direction:row; gap:10px; margin-bottom:15px; align-items:center;">
          <img src="${el.image_url || '/pagefood.png'}" alt="${el.name}" width="80" height="80" style="border-radius:8px"/>
          <div style="display:flex; flex-direction:column; gap:5px;">
            <p style="font-weight:bold; margin:0;">${el.name}</p>
            <div style="display:flex; align-items:center; justify-content:center; width:40px; font-size:15px; border:1px solid #ccc; border-radius:5px;">
              ${el.quantity}
            </div>
            ${el.short_description ? `<p style="margin:0;">${el.short_description}</p>` : ""}
            ${el.full_description ? `<p style="margin:0;">${el.full_description}</p>` : ""}
            ${el.ingredients ? `<p style="margin:0;">${el.ingredients}</p>` : ""}
            ${el.price ? `<p style="margin:0;">Цена: ${el.price}</p>` : ""}
            ${el.weight ? `<p style="margin:0;">Вес: ${el.weight}</p>` : ""}
          </div>
        </li>
      `
    )
    ).join('')


    // --- HTML для клиента ---
    const clientOrdersHtml = `<ul style='padding:0; list-style:none'>";
  ${mapPlaces2}</ul>`;

    const messageClient = `
      <div style="font-family:Arial, sans-serif; font-size:15px; line-height:1.4; color:#333;">
        <p>Спасибо за ваш заказ в BOR-FOOD.RU!</p>
        <p>Ваш заказ:</p>
        ${clientOrdersHtml}
        <p>Мы свяжемся с вами для подтверждения и уточнения деталей.</p>
      </div>
    `;

    // --- Отправка email ---
    tasks.push(sendEmail("sanek.miron2@gmail.com", "Новый заказ с сайта (BOR-FOOD.RU)", messageAdmin, "НОВЫЙ ЗАКАЗ BOR-FOOD.RU"));
    tasks.push(sendEmail(email, "Спасибо за заказ в BOR-FOOD.RU", messageClient, "BOR-FOOD.RU"));

    // --- SMS для админа ---
    const orderAdminSMS = order.map((el: Dish) => `
      ______
      Название блюда: ${el.name}
      Вес: ${el.weight || "-"}
      Цена: ${el.price || "-"}
      Количество: ${el.quantity}
    `).join("\n");

    const messageAdminSMS = `
      Новый заказ на BOR-FOOD.RU!
      ${delivery === "Доставка" ? `Доставка по адресу: ${address}` : "Самовывоз"}.
      Имя: ${name}
      Телефон: ${phone}
      Почта: ${email}
      ${orderAdminSMS}
    `;

    tasks.push(sendSMS("+79991203172", messageAdminSMS));

    // --- SMS для клиента ---
    tasks.push(sendSMS(phone, "Спасибо за заказ в BOR-FOOD.RU!"));

    // --- Выполнение всех задач ---
    const results = await Promise.allSettled(tasks);

    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error("Ошибка в send-order/route:", index, result.reason);
      }
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Ошибка в POST /send-order:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}