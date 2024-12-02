import { DonateModel } from "../../src/database/models/donateModel";
import { Request, Response } from "express";

export const getDonationById = async (req: Request, res: Response) => {
  const donation = await DonateModel.findById(req.params.id);

  res.status(200).send(donation);
};
