import { ApplicationModel } from "../../src/database/models/answerModel";
import { Request, Response } from "express";
import { PetModel } from "../../src/database/models/petModel";
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
  } = req.body;

//   const petCard=PetModel.findById(petId)
// console.log(petCard);


const user=UserModel.findOne({authId: userId})
console.log(user);

  try {
    await ApplicationModel.create({
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
    });
    
    res
      .status(201)
      .send({ message: "Application form successfully submitted" });
  } catch (error) {
    res.status(400).send(error);
    console.log("ALDAA");
    
  }
};
