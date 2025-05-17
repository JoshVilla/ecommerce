import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/ordersModel";

export async function SetOrderController(params: any) {
  try {
    await connectToDatabase();

    const newOrder = await Order.create(params);

    return newOrder;
  } catch (error) {
    console.log(error);
  }
}
