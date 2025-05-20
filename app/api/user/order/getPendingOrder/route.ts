import { NextResponse, NextRequest } from "next/server";
import { getPendingOrdersController } from "@/controllers/getPendingOrdersController";

export async function POST(request: NextRequest) {
  try {
    const { customerId, currentPage, itemsPerPage } = await request.json();
    const pendingOrders = await getPendingOrdersController(
      customerId,
      currentPage,
      itemsPerPage
    );
    return NextResponse.json(
      { data: pendingOrders, isSuccess: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Cannot fetch pending orders, Try Again", isSuccess: false },
      { status: 500 }
    );
  }
}
