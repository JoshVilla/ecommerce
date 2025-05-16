import mongoose from "mongoose";

export interface IAddressModel {
  region: string;
  province: string;
  city: string;
  barangay: string;
  addressInfo: string;
  regionCode: string;
  provinceCode: string;
  cityCode: string;
  barangayCode: string;
  otherAddress: string;
  userId: string;
  isDefaultAddress: boolean;
}

const AddressSchema = new mongoose.Schema<IAddressModel>({
  region: { type: String, required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  barangay: { type: String, required: true },
  addressInfo: { type: String, required: true },
  regionCode: { type: String, required: true },
  provinceCode: { type: String, required: true },
  cityCode: { type: String, required: true },
  barangayCode: { type: String, required: true },
  otherAddress: { type: String, required: true },
  userId: { type: String, required: true },
  isDefaultAddress: { type: Boolean, required: true },
});

const Address =
  mongoose.models.Address ||
  mongoose.model<IAddressModel>("Address", AddressSchema);
export default Address;
