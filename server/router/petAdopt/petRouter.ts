import { fetchpet } from "./../../controllers/petController/fetchPet";
import { fetchPets } from "../../controllers/petController/fetchPets";
import { petCreate } from "./../../controllers/petController/petCreate";

import { Router } from "express";
import { authMiddleware } from "../../middleware/auth";

const petRouter = Router();

petRouter.route("/create/pet").post(authMiddleware, petCreate);
petRouter.route("/get/pet").post(fetchPets);
petRouter.route("/pet-get/:id").get(fetchpet);

export default petRouter;
