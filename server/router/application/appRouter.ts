import { Router } from "express";
import { applicationForm } from "../../controllers/applicationController/applicationForm";
import { applicationFetch } from "../../controllers/applicationController/applicationFetch";
import { myapplicationfetch } from "../../controllers/applicationController/myapplicationfetch";
import { applicationdelete } from "../../controllers/applicationController/applicationdelete";
import { myapplicationupdate } from "../../controllers/applicationController/myapplicationupdate";

const appRouter = Router();

appRouter.route("/applicationForm").post(applicationForm);
appRouter.route("/applicationForm/:id").get(applicationFetch);
appRouter.route("/getmyapplication/:id").get(myapplicationfetch);
appRouter.route("/applicationdelete").delete(applicationdelete);
appRouter.route("/application/update/:id").post(myapplicationupdate);
export default appRouter;
