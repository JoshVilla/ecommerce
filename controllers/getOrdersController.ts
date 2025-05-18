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

    console.log(params);

    //add 1 to acccurately show exact limit
    const fixedLimit = itemsPerPage + 1;

    // Calculate skip value for pagination
    const skip = (currentPage - 1) * fixedLimit;

    // Fetch orders from the database with pagination
    const orders = await Order.find(params).skip(skip).limit(fixedLimit);

    // Get total count of orders for pagination metadata
    const totalOrders = await Order.countDocuments(params);
    const totalPages = Math.ceil(totalOrders / fixedLimit);

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
