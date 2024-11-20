import { Router } from "express";
import { categoryController } from "../../controllers/categoryController/categoryController";
import { fetchCategories } from "../../controllers/categoryController/fetchCategories";

const categoryRouter = Router();

categoryRouter.route("/category").post(categoryController);
categoryRouter.route("/get/categories").get(fetchCategories);

export default categoryRouter;
