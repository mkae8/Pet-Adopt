import { Router } from "express";
import { petCreate } from "../../controllers/petController/petCreate";

const petRouter = Router();

petRouter.route("/create/pet").post(petCreate);

export default petRouter;
