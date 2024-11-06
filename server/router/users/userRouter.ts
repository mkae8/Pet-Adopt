import { Router } from "express";
import { registerController } from "../../controllers/userConrtoller/registerController";

const userRouter = Router();
userRouter.route("/user/register").post(registerController);
// userRouter.route("/user/login").post(loginController);

export default userRouter;
