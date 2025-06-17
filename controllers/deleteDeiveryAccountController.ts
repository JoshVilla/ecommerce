import { connectToDatabase } from "@/lib/mongodb";
import DeliveryAccount from "@/models/deliveryAccountModel";

export async function deleteDeliveryAccountController(id: string) {
  try {
    await connectToDatabase();

    await DeliveryAccount.findByIdAndDelete(id);

    return {
      message: "Account Successfully Removed",
      isSuccess: true,
    };
  } catch (error) {
    console.log(error);
  }
}
