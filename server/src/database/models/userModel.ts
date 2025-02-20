import { Model, Schema, models, model } from "mongoose";

export type UsersModelType = {
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  authId: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<UsersModelType>({
  authId: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: false },
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

export const UserModel: Model<UsersModelType> =
  models["Users"] || model<UsersModelType>("Users", UserSchema);
