import { Model, Schema, models, model, Types } from "mongoose";

export type ApplicationModelType = {
  _id: Types.ObjectId;
  petId: Types.ObjectId;
  userId: Types.ObjectId;
  ownerId: Types.ObjectId;
  questions: string[];
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  question8: string;
  createdAt: Date;
  updatedAt: Date;
};

const ApplicationSchema = new Schema<ApplicationModelType>({
  petId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Pets",
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  question1: { type: String, required: false },
  question2: { type: String, required: false },
  question3: { type: String, required: false },
  question4: { type: String, required: false },
  question5: { type: String, required: false },
  question6: { type: String, required: false },
  question7: { type: String, required: false },
  question8: { type: String, required: false },

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
