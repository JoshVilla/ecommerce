import mongoose from "mongoose";

export interface IAdmin {
  _id?: string;
  username: string;
  password: string;
  status: string;
}

const AdminSchema = new mongoose.Schema<IAdmin>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
export default Admin;
