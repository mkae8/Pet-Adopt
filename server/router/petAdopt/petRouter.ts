import { fetchpet } from "./../../controllers/petController/fetchPet";
import { fetchPets } from "../../controllers/petController/fetchPets";
import { petCreate } from "./../../controllers/petController/petCreate";

import { Router } from "express";

const petRouter = Router();

petRouter.route("/create/pet").post(petCreate);
petRouter.route("/get/pet").get(fetchPets);
petRouter.route("/pet-get/:id").get(fetchpet);

export default petRouter;
