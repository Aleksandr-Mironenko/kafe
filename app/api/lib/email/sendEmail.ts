// "use server"
// import nodemailer from "nodemailer";

// export async function sendEmail(to: string, subject: string, html: string, from: string, attachments: File[] = []): Promise<void> {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     }
//   });

//   const emailAttachments = await Promise.all(
//     attachments.map(async (file) => {
//       const arrayBuffer = await file.arrayBuffer();
//       return {
//         filename: file.name,
//         content: Buffer.from(arrayBuffer),
//       };
//     })
//   );

//   await transporter.sendMail({
//     from: `${from} <${process.env.SMTP_USER}>`,
//     to,
//     subject,
//     html,
//     attachments: emailAttachments
//   });
//   await transporter.close();
// }


////////////////////////////



// Mail.ru
// "use server";
// import nodemailer from "nodemailer";

// export async function sendEmail(
//   to: string,
//   subject: string,
//   html: string,
//   from: string,
//   attachments: File[] = []
// ): Promise<void> {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.mail.ru",
//     port: 465,
//     secure: true, // SSL
//     auth: {
//       user: process.env.SMTP_USER, // например: myshop@mail.ru
//       pass: process.env.SMTP_PASS, // пароль приложения или обычный пароль
//     },
//   });

//   const emailAttachments = await Promise.all(
//     attachments.map(async (file) => {
//       const arrayBuffer = await file.arrayBuffer();
//       return {
//         filename: file.name,
//         content: Buffer.from(arrayBuffer),
//       };
//     })
//   );

//   await transporter.sendMail({
//     from: `${from} <${process.env.SMTP_USER}>`,
//     to,
//     subject,
//     html,
//     attachments: emailAttachments,
//   });

//   await transporter.close();
// }



////////////////////////////////////////


"use server"
import nodemailer from "nodemailer";

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  from: string,
  attachments: File[] = []
): Promise<void> {

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const emailAttachments = await Promise.all(
    attachments.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      return {
        filename: file.name,
        content: Buffer.from(arrayBuffer),
      };
    })
  );

  await transporter.sendMail({
    from: `"${from}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    attachments: emailAttachments,
  });
}