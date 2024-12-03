import { Request, Response } from "express";
import { PetModel } from "../../src/database/models/petModel";

export const fetchPets = async (req: Request, res: Response): Promise<void> => {
  try {
    const pets = await PetModel.find()
      .populate("petCategoryId")
      .sort({ createdAt: -1 });

    res.status(200).send(pets);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to fetch pets" });
  }
};
