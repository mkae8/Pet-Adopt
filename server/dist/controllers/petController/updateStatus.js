"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusUpdate = void 0;
const petModel_1 = require("../../src/database/models/petModel");
const statusUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, newStatus } = req.body;
    // Validate input
    if (!id || !newStatus) {
        res.status(400).send({ message: "ID and newStatus are required" });
        return;
    }
    try {
        // Find the pet by ID
        const pet = yield petModel_1.PetModel.findById(id);
        if (!pet) {
            res.status(404).send({ message: "Pet not found" });
            return;
        }
        // Update the pet's status
        const updateResult = yield petModel_1.PetModel.updateOne({ _id: id }, { $set: { status: newStatus } });
        if (updateResult.modifiedCount === 0) {
            res.status(400).send({ message: "No changes made to the pet's status" });
            return;
        }
        // Success response
        res.status(200).send({ message: `Pet status updated to ${newStatus}` });
    }
    catch (error) {
        console.error("Error updating pet status:", error);
        res
            .status(500)
            .send({ message: "An error occurred while updating the pet's status" });
    }
});
exports.statusUpdate = statusUpdate;
