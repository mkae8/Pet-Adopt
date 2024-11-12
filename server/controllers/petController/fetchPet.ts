import { Request, Response } from "express";
import { PetModel } from "../../src/database/models/petModel";

export const fetchpet = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const pet = await PetModel.findById(id);
    res.status(200).send(pet);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to fetch pet" });
  }
};
