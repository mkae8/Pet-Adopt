"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateDonateController_1 = require("./../../controllers/donateController/updateDonateController");
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const createDonateController_1 = require("../../controllers/donateController/createDonateController");
const donationRouter = (0, express_1.Router)();
donationRouter
    .route("/donation/create")
    .post(auth_1.authMiddleware, createDonateController_1.createDonateController);
donationRouter.route("/donation/update/:id").get(updateDonateController_1.updateDonateController);
exports.default = donationRouter;
