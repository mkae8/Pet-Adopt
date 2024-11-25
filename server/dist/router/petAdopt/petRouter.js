"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchPet_1 = require("./../../controllers/petController/fetchPet");
const fetchPets_1 = require("../../controllers/petController/fetchPets");
const petCreate_1 = require("./../../controllers/petController/petCreate");
const petdelete_1 = require("./../../controllers/petController/petdelete");
const updateStatus_1 = require("./../../controllers/petController/updateStatus");
const petUpdate_1 = require("./../../controllers/petController/petUpdate");
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const petRouter = (0, express_1.Router)();
petRouter.route("/create/pet").post(auth_1.authMiddleware, petCreate_1.petCreate);
petRouter.route("/get/pet").get(fetchPets_1.fetchPets);
petRouter.route("/pet-get/:id").get(fetchPet_1.fetchpet);
petRouter.route("/petdelete").post(petdelete_1.petdelete);
petRouter.route("/statusupdate").post(updateStatus_1.statusUpdate);
petRouter.route("/update/pet").post(auth_1.authMiddleware, petUpdate_1.petUpdate);
exports.default = petRouter;
// 8000 / get / pet
// >post huselt
