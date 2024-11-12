"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const petCreate_1 = require("../../controllers/petConroller/petCreate");
const petRouter = (0, express_1.Router)();
petRouter.route("/create/pet").post(petCreate_1.petCreate);
exports.default = petRouter;
