import { Model, Schema, models, model, Types } from "mongoose";

enum Sex {
  Male = "Эр",
  Female = "Эм",
}
enum Size {
  Small = "Жижиг",
  Medium = "Дунд",
  Large = "Том",
}
enum Status {
  Available = "Үрчлүүлэх боломжтой",
  Pending = "Одоогоор хүлээгдэж байгаа",
  Adopted = "Үрчилэгдсэн",
}
enum IsVaccined {
  Yes = "Тийм",
  No = "Үгүй",
}

export type PetsModelType = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  petCategoryId: Types.ObjectId;
  petName: string;
  image: string[];
  description: string;
  age: string;
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

export const PetModel: Model<PetsModelType> =
  models["Pets"] || model<PetsModelType>("Pets", PetSchema);
