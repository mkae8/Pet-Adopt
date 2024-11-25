import { ApplicationModel } from "../../src/database/models/answerModel";
import { Request, Response } from "express";
import { UserModel } from "../../src/database/models/userModel";
import { PetModel } from "../../src/database/models/petModel";

export const applicationForm = async (req: Request, res: Response) => {
  const {
    petId,
    userId,
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
  } = req.body;

  const user = await UserModel.findOne({ authId: userId });
  const foundPet = await PetModel.findById(petId);

  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }

  if (!foundPet) {
    res.status(404).send({ message: "Pet not found" });
    return;
  }

  try {
    await ApplicationModel.create({
      petId,
      ownerId: foundPet.userId,
      userId: user._id,
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7,
      question8,
    });
    res
      .status(201)
      .send({ message: "Application form successfully submitted" });
  } catch (error) {
    res.status(400).send(error);
    console.log("ALDAA");
  }
};
