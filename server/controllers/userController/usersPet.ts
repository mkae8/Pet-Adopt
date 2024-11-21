import { Request, Response } from "express";
import { PetModel } from "../../src/database/models/petModel";
import { UserModel } from "../../src/database/models/userModel";

export const usersPet = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await UserModel.findOne({ authId: id });

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const userId = user._id;
    const pets = await PetModel.find({ userId: userId });
    res.status(200).send(pets);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to fetch pets", error });
  }
};
