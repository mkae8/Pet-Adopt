import { Model, Schema, models, model } from "mongoose";

export type DonateModelType = {
  _id: Schema.Types.ObjectId;
  userId: string;
  isPaid: boolean;
  amount: string;
};

const donationSchema = new Schema<DonateModelType>({
  userId: { type: String, required: true, ref: "Users" },
  isPaid: { type: Boolean, required: false, default: false },
  amount: { type: String, required: false },
});

export const DonateModel: Model<DonateModelType> =
  models["donation"] || model<DonateModelType>("donation", donationSchema);
