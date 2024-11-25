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
exports.applicationForm = void 0;
const answerModel_1 = require("../../src/database/models/answerModel");
const userModel_1 = require("../../src/database/models/userModel");
const petModel_1 = require("../../src/database/models/petModel");
const applicationForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { petId, userId, question1, question2, question3, question4, question5, question6, question7, question8, } = req.body;
    console.log(req.body);
    const user = yield userModel_1.UserModel.findOne({ authId: userId });
    const foundPet = yield petModel_1.PetModel.findById(petId);
    if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
    }
    if (!foundPet) {
        res.status(404).send({ message: "Pet not found" });
        return;
    }
    console.log(foundPet);
    try {
        yield answerModel_1.ApplicationModel.create({
            petId,
            ownerId: foundPet.userId,
            userId: user._id,
            question1,
            question2,
            question3,
            question4,
            question5,
            question6,
            question7,
            question8,
        });
        res
            .status(201)
            .send({ message: "Application form successfully submitted" });
    }
    catch (error) {
        res.status(400).send(error);
        console.log("ALDAA");
    }
});
exports.applicationForm = applicationForm;
