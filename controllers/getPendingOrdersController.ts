import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/ordersModel";
import { ORDER_STATUS } from "@/utils/constant";

export async function getPendingOrdersController(
  customerId?: string,
  currentPage: number = 1,
  itemsPerPage: number = 5
) {
  try {
    await connectToDatabase();
    const skip = (currentPage - 1) * itemsPerPage;

    const baseQuery = {
      orderStatus: { $nin: [ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED] },
      ...(customerId && { customerId }),
    };

    const [orders, totalOrders] = await Promise.all([
      Order.find(baseQuery)
        .skip(skip)
        .limit(itemsPerPage)
        .sort({ createdAt: -1 })
        .lean(),
      Order.countDocuments({
        ...baseQuery,
        orderStatus: { $nin: [ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED] },
      }),
    ]);

    if (!orders.length) {
      throw new Error("No pending orders found");
    }

    return {
      orders,
      pagination: {
        currentPage,
        totalPages: Math.ceil(totalOrders / itemsPerPage),
        totalItems: totalOrders,
        itemsPerPage,
      },
    };
  } catch (error) {
    console.error("Error in getPendingOrdersController:", error);
    throw error;
  }
}
