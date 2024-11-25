"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../../controllers/categoryController/categoryController");
const fetchCategories_1 = require("../../controllers/categoryController/fetchCategories");
const categoryRouter = (0, express_1.Router)();
categoryRouter.route("/category").post(categoryController_1.categoryController);
categoryRouter.route("/get/categories").get(fetchCategories_1.fetchCategories);
exports.default = categoryRouter;
