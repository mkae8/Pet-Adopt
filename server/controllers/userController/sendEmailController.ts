import nodemailer from "nodemailer";
import express from "express";
import cors from "cors";
import { UserModel } from "../../src/database/models/userModel";

import env from "dotenv";

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
  const { email, phone, petName, senderEmail } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    const senderUser = await UserModel.findOne({ email: senderEmail });
    console.log(req.body);

    if (!user) {
      return res.status(404).send({ message: "Хэрэглэгч олдсонгүй" });
    }
    if (!senderUser) {
      return res.status(404).send({ message: "Хэрэглэгч олдсонгүй" });
    }
    await emailSender(
      email,
      "Tanii amitan urchileh huseliig Urchluulegch zuvshuursun baina",
      `
        <div style="font-family: Helvetica, Arial, sans-serif; text-align: center; padding: 20px;">
          <h2 style="color: #00466a; font-size: 24px; margin-bottom: 20px;">Tanii urchilhiig hussen amitan ${
            senderUser.firstName + " " + senderUser.lastName
          } ${petName} </h2>
          <div style="color: green; font-size: 48px; font-weight: bold; border: 2px solid green; border-radius: 8px; padding: 20px; display: inline-block;">
            Love ya all 
          </div>
          <p style="font-size: 16px; margin-top: 20px;">Holbogdooroi: ${phone}. </p>
        </div>
      `,
      "One Time Password"
    );

    res.send("Имэйл илгээсэн").status(201);
  } catch (error) {
    res.status(500).send(error);
  }
};
