import { UserModel } from "../../src/database/models/userModel";
import { Request, Response } from "express";

export const updateUserData = async (req: Request, res: Response) => {
  const { id } = req.body;

  const { username, firstName, email, lastName, phoneNumber } = req.body;
  try {
    await UserModel.findOneAndUpdate(
      { authId: id },
      {
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
      }
    );

    res.send({ message: "Update successfully" }).status(201);
  } catch (error) {
    res.send("boldoggui ee bro").status(400);
  }
};
