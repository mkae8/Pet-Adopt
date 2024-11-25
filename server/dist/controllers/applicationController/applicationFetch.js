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
exports.applicationFetch = void 0;
const answerModel_1 = require("../../src/database/models/answerModel");
const userModel_1 = require("../../src/database/models/userModel");
const applicationFetch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield userModel_1.UserModel.findOne({ authId: id });
    if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
    }
    const userId = user._id;
    try {
        const pet = yield answerModel_1.ApplicationModel.find({ ownerId: userId }).populate([
            { path: "userId" },
            { path: "petId" },
        ]);
        res.status(200).send(pet);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to fetch pet" });
    }
});
exports.applicationFetch = applicationFetch;
