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
exports.authMiddleware = void 0;
const userModel_1 = require("../src/database/models/userModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log(req.body);
    if (!id) {
        return res.status(400).send({ message: "Id not provided" });
    }
    try {
        const user = yield userModel_1.UserModel.findOne({ authId: id });
        if (!user) {
            return res.status(401).send({ message: "User not found" });
        }
        res.locals.userId = user._id;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server error" });
    }
});
exports.authMiddleware = authMiddleware;
