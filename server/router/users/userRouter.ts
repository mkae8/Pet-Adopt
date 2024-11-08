import { Router } from "express";
import { registerController } from "../../controllers/userConrtoller/registerController";
import { loginController } from "../../controllers/userConrtoller/loginController";

const userRouter = Router();
userRouter.route("/user/register").post(registerController);
userRouter.route("/user/login").post(loginController);

export default userRouter;
