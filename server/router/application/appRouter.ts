import { Router } from "express";
import { applicationForm } from "../../controllers/applicationController/applicationForm";
import { applicationFetch } from "../../controllers/applicationController/applicationFetch";
import { myapplicationFetch } from "../../controllers/applicationController/myapplicationFetch";
const appRouter = Router();

appRouter.route("/applicationForm").post(applicationForm);
appRouter.route("/applicationForm/:id").get(applicationFetch);
appRouter.route("/myapplicationForm/:id").get(myapplicationFetch);

export default appRouter;
