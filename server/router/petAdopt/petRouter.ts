import { fetchpet } from "./../../controllers/petController/fetchPet";
import { fetchPets } from "../../controllers/petController/fetchPets";
import { petCreate } from "./../../controllers/petController/petCreate";
import { petdelete } from "./../../controllers/petController/petdelete";
import { statusUpdate } from "./../../controllers/petController/updateStatus";
import { petUpdate } from "./../../controllers/petController/petUpdate";
import { Router } from "express";
import { authMiddleware } from "../../middleware/auth";

const petRouter = Router();
petRouter.route("/create/pet").post(authMiddleware, petCreate);
petRouter.route("/get/pet").get(fetchPets);
petRouter.route("/pet-get/:id").get(fetchpet);
petRouter.route("/petdelete").post(petdelete);
petRouter.route("/statusupdate").post(statusUpdate);
petRouter.route("/update/pet").post(authMiddleware, petUpdate);
export default petRouter;

// 8000 / get / pet
// >post huselt
