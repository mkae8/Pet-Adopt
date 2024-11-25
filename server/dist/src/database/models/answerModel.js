"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModel = void 0;
const mongoose_1 = require("mongoose");
const ApplicationSchema = new mongoose_1.Schema({
    petId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Pets",
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    ownerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    question1: { type: String, required: false },
    question2: { type: String, required: false },
    question3: { type: String, required: false },
    question4: { type: String, required: false },
    question5: { type: String, required: false },
    question6: { type: String, required: false },
    question7: { type: String, required: false },
    question8: { type: String, required: false },
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
