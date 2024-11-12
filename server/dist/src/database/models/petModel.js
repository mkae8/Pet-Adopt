"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetModel = void 0;
const mongoose_1 = require("mongoose");
var Sex;
(function (Sex) {
    Sex["Male"] = "Male";
    Sex["Female"] = "Female";
})(Sex || (Sex = {}));
var Size;
(function (Size) {
    Size["Small"] = "Small";
    Size["Medium"] = "Medium";
    Size["Large"] = "Large";
})(Size || (Size = {}));
var Status;
(function (Status) {
    Status["Adopted"] = "Adopted";
    Status["Canceled"] = "Canceled";
    Status["Pending"] = "Pending";
})(Status || (Status = {}));
const PetSchema = new mongoose_1.Schema({
    // userId: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    // petCategory: { type: [Schema.Types.ObjectId], required: true ,ref: "Category" },
    petName: { type: String, required: true },
    image: { type: [String], required: true },
    description: { type: String, required: true },
    age: { type: Number, required: true },
    sex: { type: String, enum: Object.values(Sex), required: true },
    size: { type: String, enum: Object.values(Size), required: true },
    weight: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, enum: Object.values(Status), required: true },
});
exports.PetModel = mongoose_1.models["Pets"] || (0, mongoose_1.model)("Pets", PetSchema);
