import { NextResponse } from 'next/server'
import { sendEmail } from '@/app/api/lib/email/sendEmail'
import { sendSMS } from '@/app/api/lib/sms-message/sendSms'
import fabric from './lib/fabric'

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
        const formData = await req.formData()
        const {
            name,
            phone,
            email,
            agree,
            agreeRec,
            delivery,
            order,
            comment,
            address,
            isService,
        } = await fabric(formData)

        const mapping: Record<string, string> = {
            shch: 'щ',
            ch: 'ч',
            sh: 'ш',
            zh: 'ж',
            yo: 'ё',
            yu: 'ю',
            ya: 'я',
            kh: 'х',
            ts: 'ц',
            "e'": 'э',
            a: 'а',
            b: 'б',
            v: 'в',
            g: 'г',
            d: 'д',
            e: 'е',
            z: 'з',
            i: 'и',
            y: 'й',
            k: 'к',
            l: 'л',
            m: 'м',
            n: 'н',
            o: 'о',
            p: 'п',
            r: 'р',
            s: 'с',
            t: 'т',
            u: 'у',
            f: 'ф',
            '-': ' ',
        }

        // Создаем регулярное выражение один раз вне функции
        // Результат: /shch|ch|sh|zh|yo|yu|ya|kh|ts|e'|[a-z-]/g
        const regex = new RegExp(
            Object.keys(mapping)
                .sort((a, b) => b.length - a.length)
                .join('|') + '|[a-z-]',
            'g',
        )

        function reverseTranslit(zn: string): string {
            return zn.replace(regex, (match) => mapping[match] || match)
        }

        if (!agree || !agreeRec) {
            //if (!agree) {
            return NextResponse.json(
                { error: 'User did not agree' },
                { status: 400 },
            )
        }

        const tasks: Promise<void>[] = []

        const mapPlaces = order
            .map(
                (el: Dish) =>
                    `
   
          <li style="margin-bottom:15px; display:flex ; position:relative">

          <div style:"padding:0 5px 10px" ><p style="font-size:20px; border:1px solid black; border-radius:10px 0 0 10px "><b>${el.quantity} x </b></p></div>

          <div><img src="${el.image_url || '/pagefood.png'}" alt="${el.name}"  style="height:150px; border-radius:8px"/></div>
          
          <div style="margin-left:20px">
            <p style="font-size:25px; margin:0"><b>${el.name}: количество ${el.quantity}</b></p>
         
            ${el.short_description ? `  <div style=" margin:0">Короткое описание: <b>${el.short_description}</b></div>` : ''}
            ${el.full_description ? `<div style="margin:0">Полное описание: <b>${el.full_description}</b></div>` : ''}
            ${el.ingredients ? `<div style="margin:0">Ингридиенты: <b>${el.ingredients}</b></div>` : ''}
            ${el.price ? `<div style="margin:0">Цена:<b>${el.price}₽</b></div>` : ''}
            ${el.weight ? `<div style="margin:0">Вес:<b>${el.weight}гр.</b></div>` : ''}
          </div>
        </li>
      `,
            )
            .join('')

        // --- HTML для админа ---
        const ordersAdminHtml = `<ul style='padding:0; list-style:none'>
      ${mapPlaces}
    </ul>

     `
        const yandexMapsLink = `https://yandex.ru/maps/?text=${encodeURIComponent(
            [address].filter(Boolean).join(', '),
        )}`
        const messageAdmin = `
      <div style="font-family:Arial, sans-serif; font-size:15px; line-height:1.4; color:#333">
      ${isService !== 'cart' ? `<p> ЗАКАЗ ПО УСЛУГЕ ${reverseTranslit(isService)}</p>` : `<p> ЗАКАЗ БЕЗ УСЛУГ</p>`}
        <p>Имя клиента: ${name}</p>
        <p style="margin: 5px">Телефон: <b><a style="font-size:15px; padding:7px" href="tel:${phone}">${phone}</a></b></p> 
        <p style="margin: 5px">Эл.почта: <b><a style="font-size:15px; padding:7px" href="mailto:${email}">${email}</a></b></p>
        ${comment !== undefined && comment !== 'undefined' && comment.length > 0 ? `<p>Комментарий клиента: ${comment.toUpperCase()}</p>` : ''}
        ${delivery === 'Доставка' ? `<p>Доставка по адресу: <a style="font-size:15px; padding:7px" href="${yandexMapsLink}">${address}</a> </p>` : '<p>Самовывоз</p>'}
        <p>Заказанные позиции:</p>
        ${ordersAdminHtml}
      </div>
    `

        const mapPlaces2 = order.map(
            (el: Dish) =>
                `
   
        <li style="margin-bottom:15px; display:flex ; position:relative">


          <div style:"padding:0 5px 10px" ><p style="font-size:20px; border:1px solid black; border-radius:10px 0 0 10px "><b>${el.quantity} x </b></p></div>

          <div><img src="${el.image_url || '/pagefood.png'}" alt="${el.name}"  style="height:150px; border-radius:8px"/></div>
          
          <div style="margin-left:20px">
            <p style="font-size:25px; margin:0"><b>${el.name}: количество ${el.quantity}</b></p>
         
            ${el.short_description ? `  <div style="  margin:0">Короткое описание: <b>${el.short_description}</b></div>` : ''}
            ${el.full_description ? `<div style="margin:0">Полное описание: <b>${el.full_description}</b></div>` : ''}
            ${el.ingredients ? `<div style="margin:0">Ингридиенты: <b>${el.ingredients}</b></div>` : ''}
            ${el.price ? `<div style="margin:0">Цена:<b>${el.price}₽</b></div>` : ''}
            ${el.weight ? `<div style="margin:0">Вес:<b>${el.weight}гр.</b></div>` : ''}
          </div>
       
        </li>
      `,
        )

        const messageClient = `
      <div style="font-family:Arial, sans-serif; font-size:15px; line-height:1.4; color:#333">
        <p>Спасибо за ваш заказ в BOR-FOOD.RU!</p>
        <p>Ваш заказ:</p>
       <ul style='padding:0; list-style:none'>
         ${mapPlaces2}
       </ul>
        <p>Мы свяжемся с вами для подтверждения и уточнения деталей.</p>
      </div>
    `

        // --- Отправка email ---
        tasks.push(
            sendEmail(
                'sanek.miron2@gmail.com',
                'Новый заказ с сайта (BOR-FOOD.RU)',
                messageAdmin,
                'НОВЫЙ ЗАКАЗ BOR-FOOD.RU',
            ),
        )
        tasks.push(
            sendEmail(
                email,
                'Спасибо за заказ в BOR-FOOD.RU',
                messageClient,
                'BOR-FOOD.RU',
            ),
        )

        // --- SMS для админа ---
        const orderAdminSMS = order
            .map(
                (el: Dish) => `
      ______
      Название блюда: ${el.name}
      Вес: ${el.weight || '-'}
      Цена: ${el.price || '-'}
      Количество: ${el.quantity}
    `,
            )
            .join('\n')

        const messageAdminSMS = `
      Новый заказ на BOR-FOOD.RU!
      ${delivery === 'Доставка' ? `Доставка по адресу: ${address}` : 'Самовывоз'}.
      Имя: ${name}
      Телефон: ${phone}
      Почта: ${email}
      ${orderAdminSMS}
    `

        tasks.push(sendSMS('+79991203172', messageAdminSMS))

        // --- SMS для клиента ---
        tasks.push(sendSMS(phone, 'Спасибо за заказ в BOR-FOOD.RU!'))

        // --- Выполнение всех задач ---
        const results = await Promise.allSettled(tasks)

        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                console.error(
                    'Ошибка в send-order/route:',
                    index,
                    result.reason,
                )
            }
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Ошибка в POST /send-order:', err)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        )
    }
}
