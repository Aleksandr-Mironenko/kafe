"use server";
const BASE_URL = process.env.BASE_URL

const API_KEY = process.env.TEXTBEE_API_KEY
const DEVICE_ID = process.env.TEXTBEE_DEVICE_ID

export async function sendSMS(to: string, text: string) {
  if (!API_KEY) {
    throw new Error("TEXTBEE_API_KEY не задан");
  }
  if (!DEVICE_ID) {
    throw new Error("TEXTBEE_DEVICE_ID не задан в");
  }

  const response = await fetch(
    `${BASE_URL}/gateway/devices/${DEVICE_ID}/send-sms`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        recipients: [to],
        message: text,
      }),
    }
  );

  const data = await response.json();

  // if (data.data.success !== true) {
  //   console.error("Ошибка от TextBee:", data);
  //   throw new Error(`TextBee error ${response.status}: ${data.error || data.message || "Неизвестная ошибка"}`);
  // }
  if (!data.success) {
    console.error("Ошибка от TextBee:", data);
    throw new Error(`TextBee error ${response.status}: ${data.error || data.message || "Неизвестная ошибка"}`);
  }
  // console.log("SMS успешно отправлено:", data);
  return data;
}










// const tasks: Promise<unknown>[] = []

// tasks.push(

//   //отправка сообщения администратору Кирилл (ТУТ МЕСТО РОСТА - БРАТЬ ДАННЫЕ С БЛОКА АДМИНОВ КОТОРЫЕ РАБОТАЮТ)
//   sendEmail(
//     "udink7405@gmail.com",
//     `Новый заказ ${orderNumbers && JSON.stringify(orderNumbers?.orderId)}`,
//     emailMessage.bodyTextMessage,
//     `НОВЫЙ ЗАКАЗ ${orderNumbers && JSON.stringify(JSON.stringify(orderNumbers?.orderId))} KANTAR`,
//     fileArray
//   ),

//   //отправка сообщения администратору (ТУТ МЕСТО РОСТА - БРАТЬ ДАННЫЕ С БЛОКА АДМИНОВ КОТОРЫЕ РАБОТАЮТ)
//   sendEmail(
//     "sanek.miron2@gmail.com",
//     `Новый заказ ${orderNumbers && JSON.stringify(orderNumbers?.orderId)}`,
//     emailMessage.bodyTextMessage,
//     `НОВЫЙ ЗАКАЗ ${orderNumbers && JSON.stringify(JSON.stringify(orderNumbers?.orderId))} KANTAR`,

//     fileArray
//   ),

//   //отправка клиенту
//   sendSMS(`${client === "sender" ? phoneFrom : client === "recipient" ? phoneWhere : client === "organizer" ? phoneOrganizer : ""} `,
//     `${orderNumbers && `Номер вашего заказа: ${JSON.stringify(orderNumbers?.orderId)}`}
//         ${sms.messageUserSMS} `),
// )

// const results = await Promise.allSettled(tasks)

// results.forEach((result, index) => {
//   if (result.status === "rejected") {
//     console.log("Ошибка в send-calculate/route:", index, result.reason)
//   }
// })