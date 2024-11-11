import { UserModel } from "../src/database/models/userModel";
import env from "dotenv";

env.config();

export const authMiddleware = async (req: any, res: any, next: any) => {
  const { id } = req.body;

  if (!id) {
    return res.status(404).send({ message: "Token provided" });
  }
  const user = await UserModel.findOne({ authId: id });
  if (!user) {
    return res.status(401).send({ message: "user bhq bn" });
  } else {
    next();
  }
};
