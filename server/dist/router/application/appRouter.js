"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const applicationForm_1 = require("../../controllers/applicationController/applicationForm");
const applicationFetch_1 = require("../../controllers/applicationController/applicationFetch");
const appRouter = (0, express_1.Router)();
appRouter.route("/applicationForm").post(applicationForm_1.applicationForm);
appRouter.route("/applicationForm/:id").get(applicationFetch_1.applicationFetch);
exports.default = appRouter;
