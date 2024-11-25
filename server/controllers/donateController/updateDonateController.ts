import { UserModel } from "../../src/database/models/userModel";
import { DonateModel } from "../../src/database/models/donateModel";
import env from "dotenv";
import { Request, Response } from "express";
env.config();

export const updateDonateController = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const donate = await DonateModel.findOneAndUpdate(
      { _id: id },
      { isPaid: true }
    );
    res.status(200).send(donate);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to fetch donate", error });
  }
};
