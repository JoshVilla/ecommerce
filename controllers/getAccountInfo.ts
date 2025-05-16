import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/userModel";
import Address from "@/models/addressModel";

export async function getAccountInfo(userId: string) {
  await connectToDatabase();

  const user = await User.findById(userId).lean();
  const address = await Address.findOne({
    userId,
    isDefaultAddress: true,
  });

  if (user) {
    //@ts-ignore
    user.address = address;
  }

  return user;
}
