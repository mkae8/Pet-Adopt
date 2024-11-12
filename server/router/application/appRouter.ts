import { Router } from "express";
import { applicationForm } from "../../controllers/applicationController/applicationForm";
// import { authMiddleware } from "../../middleware/auth";

const appRouter = Router();

appRouter.route("/applicationForm").post( applicationForm);

export default appRouter;
