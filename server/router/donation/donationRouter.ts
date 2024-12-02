import { updateDonateController } from "./../../controllers/donateController/updateDonateController";
import { Router } from "express";
import { authMiddleware } from "../../middleware/auth";
import { getDonationById } from "../../controllers/donateController/getDonation";

import { createDonateController } from "../../controllers/donateController/createDonateController";

const donationRouter = Router();

donationRouter
  .route("/donation/create")
  .post(authMiddleware, createDonateController);

donationRouter.route("/donation/update/:id").get(updateDonateController);

donationRouter.get("/donation/:id", getDonationById);

export default donationRouter;
