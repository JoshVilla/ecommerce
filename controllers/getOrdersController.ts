import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/ordersModel";

export async function getOrdersController(
  customerId: string,
  currentPage: number = 1,
  itemsPerPage: number = 10,
  orderStatus: number,
  paymentServiceMode: number
) {
  try {
    await connectToDatabase();

    let params: any = {};

    if (customerId) {
      params.customerId = customerId;
    }
    if (orderStatus) {
      params.orderStatus = Number(orderStatus);
    }

    if (paymentServiceMode) {
      params.paymentServiceMode = Number(paymentServiceMode);
    }

    // Calculate skip value for pagination
    const skip = (currentPage - 1) * itemsPerPage;

    // Fetch orders from the database with pagination
    const orders = await Order.find(params).skip(skip).limit(itemsPerPage);

    // Get total count of orders for pagination metadata
    const totalOrders = await Order.countDocuments(params);
    const totalPages = Math.ceil(totalOrders / itemsPerPage);

    return {
      orders,
      pagination: {
        currentPage: currentPage,
        totalPages,
        totalItems: totalOrders,
        itemsPerPage,
      },
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
