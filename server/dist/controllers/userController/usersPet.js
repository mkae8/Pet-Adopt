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
exports.usersPet = void 0;
const petModel_1 = require("../../src/database/models/petModel");
const userModel_1 = require("../../src/database/models/userModel");
const usersPet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield userModel_1.UserModel.findOne({ authId: id });
        if (!user) {
            res.status(404).send({ message: "User not found" });
            return;
        }
        const userId = user._id;
        const pets = yield petModel_1.PetModel.find({ userId: userId });
        res.status(200).send(pets);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to fetch pets", error });
    }
});
exports.usersPet = usersPet;
