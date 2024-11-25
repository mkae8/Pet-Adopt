"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    categoryName: { type: String, unique: true, sparse: true },
    categoryLabel: { type: String, unique: true },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
        immutable: true,
    },
    updatedAt: { type: Date, default: Date.now, required: true },
}, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } });
exports.CategoryModel = mongoose_1.models["Category"] || (0, mongoose_1.model)("Category", CategorySchema);
