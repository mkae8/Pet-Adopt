import { Router } from "express";
import { registerController } from "../../controllers/userConrtoller/registerController";
import { updateUserData } from "../../controllers/userConrtoller/updateUserData";

const userRouter = Router();

userRouter.route("/user/register").post(registerController);
userRouter.route("/user/update").post(updateUserData);

export default userRouter;
