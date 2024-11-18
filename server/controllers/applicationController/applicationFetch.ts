import { Request, Response } from "express";
import { ApplicationModel } from "../../src/database/models/answerModel";

export const applicationFetch = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const pet = await ApplicationModel.findById(id);
    res.status(200).send(pet);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to fetch pet" });
  }
};
