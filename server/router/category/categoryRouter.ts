import { Router } from "express";
import { categoryController } from "../../controllers/categoryController/categoryController";

const categoryRouter = Router();

categoryRouter.route("/category").post(categoryController);

export default categoryRouter;
