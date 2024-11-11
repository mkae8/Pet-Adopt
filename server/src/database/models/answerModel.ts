import { Model, Schema, models, model, Types } from "mongoose";

export type ApplicationModelType = {
  _id: Types.ObjectId;
  petId: Types.ObjectId;
  userId: Types.ObjectId;
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  question8: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const ApplicationSchema = new Schema<ApplicationModelType>({
  petId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Pet",
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  question1: { type: String, required: true },
  question2: { type: String, required: true },
  question3: { type: String, required: true },
  question4: { type: String, required: true },
  question5: { type: String, required: true },
  question6: { type: String, required: true },
  question7: { type: String, required: true },
  question8: { type: Boolean, required: true },

  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const ApplicationModel: Model<ApplicationModelType> =
  models["Application"] ||
  model<ApplicationModelType>("Application", ApplicationSchema);
