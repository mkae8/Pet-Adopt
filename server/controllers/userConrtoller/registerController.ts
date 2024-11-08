import { UserModel } from "../../src/database/models/userModel";
import bcrypt from "bcrypt";
import env from "dotenv";
env.config();

export const registerController = async (req: any, res: any) => {
  const { firstname, lastname, email, address, password, phoneNumber } =
    req.body;

  const hashedPassword = bcrypt.hashSync(password, 11);


  try {
    const newUser = await UserModel.create({
      firstname,
      lastname,
      email,
      address,
      phoneNumber,
      password: hashedPassword,
    });
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.send({ message: "Email already registered" });
  }
};
