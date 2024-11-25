"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetModel = void 0;
const mongoose_1 = require("mongoose");
var Sex;
(function (Sex) {
    Sex["Male"] = "\u042D\u0440";
    Sex["Female"] = "\u042D\u043C";
})(Sex || (Sex = {}));
var Size;
(function (Size) {
    Size["Small"] = "\u0416\u0438\u0436\u0438\u0433";
    Size["Medium"] = "\u0414\u0443\u043D\u0434";
    Size["Large"] = "\u0422\u043E\u043C";
})(Size || (Size = {}));
var Status;
(function (Status) {
    Status["Available"] = "\u04AE\u0440\u0447\u043B\u04AF\u04AF\u043B\u044D\u0445 \u0431\u043E\u043B\u043E\u043C\u0436\u0442\u043E\u0439";
    Status["Pending"] = "\u041E\u0434\u043E\u043E\u0433\u043E\u043E\u0440 \u0445\u04AF\u043B\u044D\u044D\u0433\u0434\u044D\u0436 \u0431\u0430\u0439\u0433\u0430\u0430";
    Status["Adopted"] = "\u04AE\u0440\u0447\u043B\u044D\u0433\u0434\u0441\u044D\u043D";
})(Status || (Status = {}));
var IsVaccined;
(function (IsVaccined) {
    IsVaccined["Yes"] = "\u0422\u0438\u0439\u043C";
    IsVaccined["No"] = "\u04AE\u0433\u04AF\u0439";
})(IsVaccined || (IsVaccined = {}));
const PetSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Users" },
    petCategoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: false,
        ref: "Category",
    },
    petName: { type: String, required: true },
    isVaccined: { type: String, required: false },
    image: { type: [String], required: true },
    description: { type: String, required: true },
    age: { type: String, required: true },
    sex: { type: String, enum: Object.values(Sex), required: true },
    size: { type: String, enum: Object.values(Size), required: true },
    weight: { type: String, required: true },
    location: { type: String, required: true },
    status: {
        type: String,
        enum: Object.values(Status),
        required: false,
    },
});
exports.PetModel = mongoose_1.models["Pets"] || (0, mongoose_1.model)("Pets", PetSchema);
