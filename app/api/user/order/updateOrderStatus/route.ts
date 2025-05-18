import { NextResponse, NextRequest } from "next/server";
import { updateOrderStatusController } from "@/controllers/updateOrderStatusController";

export async function POST(req: NextRequest) {
  try {
    const { orderId, newStatus } = await req.json();

    const updatedOrder = await updateOrderStatusController(orderId, newStatus);

    return NextResponse.json({
      data: updatedOrder,
      message: "Order Updated",
      isSuccess: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        isSuccess: false,
      },
      { status: 500 }
    );
  }
}
