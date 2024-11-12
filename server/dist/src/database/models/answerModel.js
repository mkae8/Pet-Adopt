"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModel = void 0;
const mongoose_1 = require("mongoose");
const ApplicationSchema = new mongoose_1.Schema({
    petID: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Pet",
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    question1: { type: String, required: true },
    question2: { type: String, required: true },
    question3: { type: String, required: true },
    question4: { type: String, required: true },
    question5: { type: String, required: true },
    question6: { type: String, required: true },
    question7: { type: String, required: true },
    question8: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
exports.ApplicationModel = mongoose_1.models["Application"] ||
    (0, mongoose_1.model)("Application", ApplicationSchema);
