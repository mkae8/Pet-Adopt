import { ApplicationModel } from "../../src/database/models/answerModel";
import { Request, Response } from "express";

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

  try {
    await ApplicationModel.create({
      userId: userId,
      petId,
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
    console.log(error);
    res.status(400).send(error);
  }
};
