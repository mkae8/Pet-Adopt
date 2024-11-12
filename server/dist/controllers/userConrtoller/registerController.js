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
exports.registerController = void 0;
const userModel_1 = require("../../src/database/models/userModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, username, lastName, email, id } = req.body;
    const isUserExisted = yield userModel_1.UserModel.findOne({ authId: id });
    if (!isUserExisted) {
        try {
            yield userModel_1.UserModel.create({
                firstName,
                authId: id,
                username,
                lastName,
                email,
            });
            res.status(201).send({ message: "User created successfully" });
        }
        catch (error) {
            console.log(error);
            res.send({ message: "Email already registered" });
        }
    }
    else {
        res.status(200).send({ message: "Successfully Logged In" });
    }
});
exports.registerController = registerController;
