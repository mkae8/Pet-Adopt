import { UserModel } from "../src/database/models/userModel";
import env from "dotenv";

env.config();

export const authMiddleware = async (req: any, res: any, next: any) => {
  const { id } = req.body;
  if (!id) {
    return req.status(404).send({ message: "Token provided" });
  }
  const user = await UserModel.findOne({ authid: id });
  if (!user) {
    return res.status(401).send({ message: "oroogui bn" });
  } else {
    next();
  }
};
