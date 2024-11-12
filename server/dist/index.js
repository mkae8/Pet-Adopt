"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./router/users/userRouter"));
const petRouter_1 = __importDefault(require("./router/petAdopt/petRouter"));
const appRouter_1 = __importDefault(require("./router/application/appRouter"));
const config_1 = require("./src/database/config");
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, config_1.connectDataBase)();
app.use("/", userRouter_1.default);
app.use("/", petRouter_1.default);
app.use("/", appRouter_1.default);
app.listen(port, () => {
    console.log(`nee deer asna --> http://localhost:${port}`);
});
