import { connectToDatabase } from "@/lib/mongodb";
import DeliveryAccount from "@/models/deliveryAccountModel";
import { hashPassword } from "@/utils/asyncHelpers";

export async function addDeliveryAccountController(
  username: string,
  password: string
) {
  try {
    await connectToDatabase();

    const usernameExist = await DeliveryAccount.exists({ username });
    if (usernameExist) {
      return {
        message: "Username already exists",
        isSuccess: false,
      };
    }

    const hashedPassword = await hashPassword(password);

    const newAccount = new DeliveryAccount({
      username,
      password: hashedPassword,
    });

    await newAccount.save();

    return {
      message: "Account Added",
      isSuccess: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred",
      isSuccess: false,
    };
  }
}
