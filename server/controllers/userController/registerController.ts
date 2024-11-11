import { UserModel } from "../../src/database/models/userModel";
import env from "dotenv";
env.config();

export const registerController = async (req: any, res: any) => {
  const { firstName, username, lastName, email, id } = req.body;

  const isUserExisted = await UserModel.findOne({ authId: id });

  if (!isUserExisted) {
    try {
      await UserModel.create({
        firstName,
        authId: id,
        username,
        lastName,
        email,
      });
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
      res.send({ message: "Email already registered" });
    }
  } else {
    res.status(200).send({ message: "Successfully Logged In" });
  }
};
