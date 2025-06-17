import { connectToDatabase } from "@/lib/mongodb";
import DeliveryAccount from "@/models/deliveryAccountModel";

export async function getDeliveryAccountsController() {
  try {
    await connectToDatabase();

    const list = DeliveryAccount.find({});

    return list;
  } catch (error) {
    console.log(error);
  }
}
