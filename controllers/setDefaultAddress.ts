import Address from "@/models/addressModel";
import { connectToDatabase } from "@/lib/mongodb";

export async function defaultAddress(addressId: string, userId: string) {
  await connectToDatabase();

  await Address.updateMany(
    { userId }, // or whatever field represents the user
    { isDefaultAddress: false }
  );

  const res = await Address.findByIdAndUpdate(
    addressId,
    { isDefaultAddress: true },
    { new: true, runValidators: true }
  );

  return res;
}
