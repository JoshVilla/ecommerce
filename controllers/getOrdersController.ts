import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/ordersModel";

export async function getOrdersController(customerId: string) {
  try {
    await connectToDatabase();

    const orders = await Order.find({ customerId });

    return orders;
  } catch (error) {
    console.log(error);
  }
}
