import { UserModel } from "../src/database/models/userModel";
import env from "dotenv";

env.config();

export const authMiddleware = async (req: any, res: any, next: any) => {
  const { id } = req.body;

  console.log(req.body);

  if (!id) {
    return res.status(400).send({ message: "Id not provided" });
  }

  try {
    const user = await UserModel.findOne({ authId: id });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    res.locals.userId = user._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};
