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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petCreate = void 0;
const petModel_1 = require("../../src/database/models/petModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const petCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { petName, 
    // petCategory,
    image, age, sex, size, weight, description, location, status, } = req.body;
    if (!petName ||
        // !petCategory ||
        !image ||
        !description ||
        !age ||
        !sex ||
        !size ||
        !weight ||
        !location ||
        !status) {
        return res.status(400).send({ message: "Hooson bn" });
    }
    try {
        const newPet = yield petModel_1.PetModel.create({
            petName,
            //   petCategory,
            image,
            age,
            sex,
            size,
            weight,
            description,
            location,
            status,
        });
        res.status(201).send({ message: "Pet created successfully", newPet });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to create pet" });
    }
});
exports.petCreate = petCreate;
