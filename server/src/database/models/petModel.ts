import { Model, Schema, models, model, Types } from "mongoose";

enum Sex {
  Male = "Male",
  Female = "Female",
}
enum Size {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}
enum Status {
  Available = "Үрчлүүлэх боломжтой",
  Pending = " Одоогоор хүлээгдэж байгаа",
  Adopted = "Үрчилэгдсэн",
}
enum IsVaccined {
  True = "Тийм",
  False = "Үгүй",
  Pending = "Хараахан хийлгэж амжаагүй",
}

export type PetsModelType = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  petCategoryId: Types.ObjectId;
  petName: string;
  image: string[];
  description: string;
  age: number;
  sex: Sex;
  size: Size;
  weight: string;
  location: string;
  isVaccined: IsVaccined;
  status: Status;
};

const PetSchema = new Schema<PetsModelType>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
  petCategoryId: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Category",
  },
  petName: { type: String, required: true },
  isVaccined: { type: String, required: false },
  image: { type: [String], required: true },
  description: { type: String, required: true },
  age: { type: Number, required: true },
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

export const PetModel: Model<PetsModelType> =
  models["Pets"] || model<PetsModelType>("Pets", PetSchema);
