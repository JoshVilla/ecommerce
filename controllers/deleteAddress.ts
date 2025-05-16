import { connectToDatabase } from "@/lib/mongodb";
import Address from "@/models/addressModel";

export async function deleteUserAddress(addressId: string) {
  try {
    await connectToDatabase();
    const address = await Address.findByIdAndDelete(addressId);
    return address;
  } catch (error) {
    console.log(error);
  }
}
