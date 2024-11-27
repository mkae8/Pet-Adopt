import { Request, Response } from "express";
import { ApplicationModel } from "../../src/database/models/answerModel";
import { UserModel } from "../../src/database/models/userModel";

export const myapplicationfetch = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const user = await UserModel.findOne({ authId: id });

  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }

  const userId = user._id;

  try {
    const pet = await ApplicationModel.find({ userId: userId }).populate([
      { path: "petId" },
    ]);

    res.status(200).send(pet);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to fetch pet" });
  }
};
