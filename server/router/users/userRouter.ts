import { Router } from "express";
import { registerController } from "../../controllers/userController/registerController";
import { updateUserData } from "../../controllers/userController/updateUserData";
import { authMiddleware } from "../../middleware/auth";

const userRouter = Router();

userRouter.route("/user/register").post(registerController);
userRouter.route("/user/update").post(authMiddleware, updateUserData);

export default userRouter;
