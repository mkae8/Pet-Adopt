import { UserModel } from "../../src/database/models/userModel";
import bcrypt from "bcrypt";
import env from "dotenv";
import { connectDataBase } from "../../src/database/config";
import jwt from "jsonwebtoken";
env.config();
connectDataBase();

export const loginController = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .send({ message: "Нууц үг эсвэл хэрэглэгчийн нэр буруу байна" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .send({ message: "Нууц үг эсвэл хэрэглэгчийн нэр буруу байна" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET as string, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
