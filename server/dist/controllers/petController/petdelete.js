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
exports.petdelete = void 0;
const petModel_1 = require("../../src/database/models/petModel");
const answerModel_1 = require("../../src/database/models/answerModel");
const petdelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (!id) {
        res.status(400).send({ message: "ID is required" });
        return;
    }
    try {
        const pet = yield petModel_1.PetModel.findById(id);
        if (!pet) {
            res.status(404).send({ message: "Pet not found" });
            return;
        }
        const deletionResult = yield petModel_1.PetModel.deleteOne({ _id: id });
        if (deletionResult.deletedCount === 0) {
            res.status(404).send({ message: "Pet not found for deletion" });
            return;
        }
        try {
            const application = yield answerModel_1.ApplicationModel.find({ petId: id });
            if (application) {
                const deletionResult = yield answerModel_1.ApplicationModel.deleteMany({ petId: id });
                res.status(200).send({ message: "Pet deleted successfully" });
                return;
            }
            res.status(200).send({ message: "Pet deleted successfully" });
        }
        catch (error) {
            console.error("Error deleting pet:", error);
            res
                .status(500)
                .send({ message: "An error occurred while deleting the pet" });
        }
    }
    catch (error) {
        console.error("Error deleting pet:", error);
        res
            .status(500)
            .send({ message: "An error occurred while deleting the pet" });
    }
});
exports.petdelete = petdelete;
