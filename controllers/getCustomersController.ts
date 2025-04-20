import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/userModel";

export async function getCustomers(params: any) {
  await connectToDatabase();

  const customers = await User.find({});

  return customers;
}
