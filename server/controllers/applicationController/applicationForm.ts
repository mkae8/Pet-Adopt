import { ApplicationModel } from "../../src/database/models/answerModel";
import { Request, Response } from "express";

export const applicationForm = async (req: Request, res: Response) => {
  const { id } = req.body;

  const {
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
    await ApplicationModel.create(
      { authId: id },
      {
        question1,
        question2,
        question3,
        question4,
        question5,
        question6,
        question7,
        question8,
      }
    );

    res
      .send({ message: "Application form  successfully submitted" })
      .status(201);
  } catch (error) {
    res.send("boldoggui ee bro").status(400);
  }
};
