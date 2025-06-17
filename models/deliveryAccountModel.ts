import mongoose from "mongoose";

export interface IDeliveryAccount {
  _id?: string;
  username: string;
  password: string;
}

const DeliveryAccountSchema = new mongoose.Schema<IDeliveryAccount>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const DeliveryAccount =
  mongoose.models.DeliveryAccount ||
  mongoose.model<IDeliveryAccount>("DeliveryAccount", DeliveryAccountSchema);
export default DeliveryAccount;
