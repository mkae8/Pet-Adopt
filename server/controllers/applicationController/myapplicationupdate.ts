import { Request, Response } from "express";
import { ApplicationModel } from "../../src/database/models/answerModel";
import { UserModel } from "../../src/database/models/userModel";

export const myapplicationupdate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
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

  const application = await ApplicationModel.findOne({ _id: id });

  if (!application) {
    res.status(404).send({ message: "Application not found" });
    return;
  }

  try {
    const updatedApp = await ApplicationModel.findOneAndUpdate(
      {
        _id: application._id,
      },
      {
        question1: question1,
        question2: question2,
        question3: question3,
        question4: question4,
        question5: question5,
        question6: question6,
        question7: question7,
        question8: question8,
      }
    );
    res.status(200).send(updatedApp);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to update application" });
  }
};
