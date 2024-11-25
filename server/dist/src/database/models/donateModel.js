"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonateModel = void 0;
const mongoose_1 = require("mongoose");
const donationSchema = new mongoose_1.Schema({
    userId: { type: String, required: true, ref: "Users" },
    isPaid: { type: Boolean, required: false, default: false },
    amount: { type: String, required: false },
});
exports.DonateModel = mongoose_1.models["donation"] || (0, mongoose_1.model)("donation", donationSchema);
