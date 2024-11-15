import { ApplicationModel } from "../../src/database/models/answerModel";
import { Request, Response } from "express";
import { UserModel } from "../../src/database/models/userModel";

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
  } = req.body.inputValues;

  const user = await UserModel.findOne({ authId: userId });

  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }

  try {
    await ApplicationModel.create({
      petId,
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
