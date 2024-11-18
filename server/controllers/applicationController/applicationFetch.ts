import { Request, Response } from "express";
import { ApplicationModel } from "../../src/database/models/answerModel";
import { UserModel } from "../../src/database/models/userModel";

export const applicationFetch = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  console.log(id);

  const user = await UserModel.findOne({ authId: id });

  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }

  const userId = user._id;

  console.log(userId);

  try {
    const pet = await ApplicationModel.find({ ownerId: userId }).populate([
      { path: "userId" },
      { path: "petId" },
    ]);
    console.log(pet);

    res.status(200).send(pet);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to fetch pet" });
  }
};
