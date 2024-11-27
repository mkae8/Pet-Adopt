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
    console.log(req.body);
    console.log(pet);

    if (!user) {
      return res.status(404).send({ message: "Хэрэглэгч олдсонгүй" });
    }
    if (!senderUser) {
      return res.status(404).send({ message: "Хэрэглэгч олдсонгүй" });
    }
    await emailSender(
      email,
      "Таны амьтан үрчлэх хүсэлтийг зөвшөөрсөн байна.",
      `
        <div style="font-family: Helvetica, Arial, sans-serif; text-align: center; padding: 20px;">
          <h2 style="color: #00466a; font-size: 24px; margin-bottom: 20px;">Таны үрчлэхийг хүссэн амьтан: ${
            senderUser.firstName + " " + senderUser.lastName
          } эзэнтэй ${petName}. </h2> 
        <img style="width: 250px; height: 350px; object-fit: cover;" src="${
          pet?.image[0]
        }" alt="" />
          <div>Нэмэлт мэдээлэл: ${description}</div>
          <p style="font-size: 16px; margin-top: 20px;">Үрчлүүлэгчийн утасны дугаар : ${phone}. </p>
        </div>
      `,
      "One Time Password"
    );

    res.send("Имэйл илгээсэн").status(201);
  } catch (error) {
    res.status(500).send(error);
  }
};
