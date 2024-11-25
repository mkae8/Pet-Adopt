import { UserModel } from "./../../src/database/models/userModel";
import { DonateModel } from "../../src/database/models/donateModel";
import env from "dotenv";
env.config();

export const createDonateController = async (req: any, res: any) => {
  const { id, amount } = req.body;

  try {
    const user = await UserModel.findOne({ authId: id });

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const userId = user._id;
    const donate = await DonateModel.create({ userId, amount });
    res.status(200).send(donate);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to fetch donate", error });
  }
};
