import { UserModel } from "../../src/database/models/userModel";
import { DonateModel } from "../../src/database/models/donateModel";
import env from "dotenv";
import { Request, Response } from "express";
env.config();

export const updateDonateController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const donate = await DonateModel.findOneAndUpdate(
      { _id: id },
      { isPaid: true }
    );

    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Шилжүүлэг амжилттай</title>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Nunito', Arial, sans-serif;
            text-align: center;
            background-color: #f3f4f6;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
          .success-container {
            background: #ffffff;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #F97316;
            font-size: 2.5rem;
          }
          p {
            font-size: 1.2rem;
            color: #4b5563;
          }
          .btn {
            margin-top: 1rem;
            padding: 0.7rem 1.5rem;
            background-color: #F97316;
            color: white;
            text-decoration: none;
            font-size: 1rem;
            border-radius: 5px;
            transition: background-color 0.3s;
          }
          .btn:hover {
            background-color: #ea580c;
          }
        </style>
      </head>
      <body>
        <div class="success-container">
          <h1>Төлбөрийг амжилттай хийлээ</h1>
          <p>Хандив өгсөнд баярлалаа! Таны төлбөр амжилттай.</p>
          <a href="https://pet-adopt-nu.vercel.app/" class="btn">Нүүр хуудас руу буцах</a>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to fetch donate", error });
  }
};
