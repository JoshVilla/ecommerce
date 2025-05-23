import { NextRequest, NextResponse } from "next/server";
import { getOrdersController } from "@/controllers/getOrdersController";

export async function POST(req: NextRequest) {
  try {
    const {
      customerId,
      itemsPerPage,
      currentPage,
      orderStatus,
      paymentServiceMode,
    } = await req.json();

    const orders = await getOrdersController(
      customerId,
      currentPage,
      itemsPerPage,
      orderStatus,
      paymentServiceMode
    );

    return NextResponse.json({
      message: "Orders Fetched",
      data: orders,
      isSuccess: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
