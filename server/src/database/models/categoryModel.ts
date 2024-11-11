import { Model, Schema, models, model, Types } from "mongoose";

export type CategoryModelType = {
  _id: Schema.Types.ObjectId;
  categoryName?: string;
  createdAt: Date;
  updatedAt: Date;
};


const CategorySchema = new Schema<CategoryModelType>(
  {
    categoryName: { type: String, unique: true, sparse: true },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
      immutable: true,
    },
    updatedAt: { type: Date, default: Date.now, required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

export const CategoryModel: Model<CategoryModelType> =
  models["Category"] || model<CategoryModelType>("Category", CategorySchema);
