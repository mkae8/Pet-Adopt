import { UserModel } from "../../src/database/models/userModel";

export const updateUserData = async (req: any, res: any) => {
  const { id } = res.locals;
  const { username, firstname, email, lastname, phoneNumber } = req.body;
  try {
    const userUpdate = await UserModel.findByIdAndUpdate(id, {
      firstname,
      lastname,
      username,
      email,
      phoneNumber,
    });
    console.log(userUpdate);

    res.send({ message: "Update successfully" }).status(201);
  } catch (error) {
    res.send("boldoggui ee bro").status("400");
  }
};
