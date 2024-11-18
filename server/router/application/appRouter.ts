import { Router } from "express";
import { applicationForm } from "../../controllers/applicationController/applicationForm";
import { applicationFetch } from "../../controllers/applicationController/applicationFetch";
import { authMiddleware } from "../../middleware/auth";

const appRouter = Router();

appRouter.route("/applicationForm").post(applicationForm);
appRouter.route("/applicationForm/:id").get(applicationFetch);

export default appRouter;
