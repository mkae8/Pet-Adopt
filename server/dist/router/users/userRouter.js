"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerController_1 = require("../../controllers/userConrtoller/registerController");
const updateUserData_1 = require("../../controllers/userConrtoller/updateUserData");
const userRouter = (0, express_1.Router)();
userRouter.route("/user/register").post(registerController_1.registerController);
userRouter.route("/user/update").post(updateUserData_1.updateUserData);
exports.default = userRouter;
