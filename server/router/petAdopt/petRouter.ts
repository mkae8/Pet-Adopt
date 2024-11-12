import { petCreate } from "./../../controllers/petController/petCreate";

import { Router } from "express";

const petRouter = Router();

petRouter.route("/create/pet").post(petCreate);

export default petRouter;
