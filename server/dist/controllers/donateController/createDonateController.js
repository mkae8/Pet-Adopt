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
exports.createDonateController = void 0;
const userModel_1 = require("./../../src/database/models/userModel");
const donateModel_1 = require("../../src/database/models/donateModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createDonateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, amount } = req.body;
    try {
        const user = yield userModel_1.UserModel.findOne({ authId: id });
        if (!user) {
            res.status(404).send({ message: "User not found" });
            return;
        }
        const userId = user._id;
        const donate = yield donateModel_1.DonateModel.create({ userId, amount });
        res.status(200).send(donate);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to fetch donate", error });
    }
});
exports.createDonateController = createDonateController;
