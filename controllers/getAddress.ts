import { connectToDatabase } from "@/lib/mongodb";
import Address from "@/models/addressModel";

export async function getAddress(userId: string) {
  try {
    await connectToDatabase();
    const address = await Address.find({ userId }).sort({
      isDefaultAddress: -1,
    });
    return address;
  } catch (error) {
    console.log(error);
  }
}
