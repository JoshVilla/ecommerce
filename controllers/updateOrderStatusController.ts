import React from "react";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/ordersModel";

export async function updateOrderStatusController(
  orderId: string,
  newStatus: number
) {
  try {
    await connectToDatabase();

    const updatedOrder = await Order.findByIdAndUpdate(orderId, {
      orderStatus: newStatus,
    });

    return updatedOrder;
  } catch (error) {
    console.log(error);
  }
}
