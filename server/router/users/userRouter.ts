import { Router } from "express";
import { registerController } from "../../controllers/userController/registerController";
import { updateUserData } from "../../controllers/userController/updateUserData";
import { authMiddleware } from "../../middleware/auth";
import { usersPet } from "../../controllers/userController/usersPet";
import { sendEmailController } from "../../controllers/userController/sendEmailController";

const userRouter = Router();

userRouter.route("/user/register").post(registerController);
userRouter.route("/user/update").post(authMiddleware, updateUserData);
userRouter.route("/pets/user/:id").get(usersPet);
userRouter.route("/sendMailer").post(sendEmailController);

export default userRouter;
