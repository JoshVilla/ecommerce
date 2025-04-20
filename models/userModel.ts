import mongoose from "mongoose";

export interface IUser {
  email: string;
  firstname: string;
  middlename: string;
  lastname: string;
  password: string;
  birthdate: string;
  phone: string;
  address: string;
  gender: string;
  isSeller: boolean;
  createdAt?: string | undefined;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    middlename: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    birthdate: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    isSeller: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
