import nodemailer from "nodemailer";
import express from "express";
import cors from "cors";
import { UserModel } from "../../src/database/models/userModel";

import env from "dotenv";
import { PetModel } from "../../src/database/models/petModel";

env.config();

const app = express();
app.use(express.json());
app.use(cors());

const emailSender = async (
  sendEmail: string,
  subject: string,
  html: string,
  text: string
) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const options = {
    from: process.env.EMAIL_USER,
    to: sendEmail,
    subject: subject,
    text: text,
    html: html,
  };

  await transport.sendMail(options);
};

export const sendEmailController = async (req: any, res: any) => {
  const { email, phone, petName, senderEmail, description, petId } = req.body;

  try {
    const pet = await PetModel.findById(petId);
    const user = await UserModel.findOne({ email });
    const senderUser = await UserModel.findOne({ email: senderEmail });
    if (!user) {
      return res.status(404).send({ message: "Хэрэглэгч олдсонгүй" });
    }
    if (!senderUser) {
      return res.status(404).send({ message: "Хэрэглэгч олдсонгүй" });
    }

    const senderName = `${senderUser.firstName} ${senderUser.lastName}`;
    const subject = "Таны амьтан үрчлэх хүсэлтийг зөвшөөрсөн байна";
    const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Гэрийн тэжээвэр амьтдыг үрчлэн авах зөвшөөрөл</title>
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
      </style>
  </head>
  <body style="font-family: 'Roboto', Helvetica, Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; margin: 0; padding: 0;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
              <td style="padding: 40px 30px; text-align: center; background-color: #f97316;">
                  <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Гэрийн тэжээвэр амьтдыг үрчлэн авах зөвшөөрөл</h1>
              </td>
          </tr>
          <tr>
              <td style="padding: 40px 30px;">
                  <h2 style="color: #333333; font-size: 24px; margin-top: 0;">Баяр хүргэе!!</h2>
                  <p style="color: #666666; font-size: 16px;">
                      Таны <strong style="color: #f97316;">${petName}</strong> үрчлүүлэх хүсэлтийг <strong style="color: #f97316;">${senderName}</strong> зөвшөөрлөө.
                  </p>
                  <p style="color: #666666; font-size: 16px;">
                      Бид таныг хэрэгцээтэй байгаа амьтанд хайр халамжаа өгч, гэр бүлдээ хүлээн авах энэ чухал алхмыг хийж байгаад маш их баярлаж байна. Таны энэрэнгүй сэтгэл, чин сэтгэлийн зүтгэлийг үнэлж байна
                  </p>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px; margin-bottom: 30px;">
                      <tr>
                          <td align="center">
                              
                                  <img src=${pet?.image[0]} alt="Paw Print" style="width: 400px; height: 400px; object-fit: cover;">
                      
                          </td>
                      </tr>
                  </table>
           <div style="font-size: 16px; color: #f97316; font-weight: bold; display: flex; flex-direction: column; gap: 4px;">
  Эзэний явуулсан мэдээлэл:
  <p style="margin: 0; color: #666666;">${description}</p>
</div>

                  
                  <p style="color: #666666; font-size: 16px;">
                     Та амьтаны эзэнтэй энэхүү дугаараар холбогдоно уу: <strong style="color: #f97316;">${phone}</strong>
                  </p>
              </td>
          </tr>
          <tr>
              <td style="padding: 30px; text-align: center; background-color: #eeeeee;">
                  <p style="color: #888888; font-size: 14px; margin: 0;">
                      Биднийг сонгосонд баярлалаа. Бид хамтдаа амьтдын амьдралд өөрчлөлт авчирч байна.
                  </p>
              </td>
          </tr>
      </table>
  </body>
  </html>
  `;
    const textContent = `Congratulations! Your request to adopt ${petName} has been approved by ${senderName}. Please contact the adoption center at ${phone} for next steps.`;
    await emailSender(email, subject, htmlContent, textContent);

    res.send("Имэйл илгээсэн").status(201);
  } catch (error) {
    res.status(500).send(error);
  }
};
