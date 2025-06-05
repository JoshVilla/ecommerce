import { NextResponse, NextRequest } from "next/server";
import { getPendingOrdersController } from "@/controllers/getPendingOrdersController";
import { verifyToken } from "@/utils/nonAsyncHelpers";

export async function POST(request: NextRequest) {
  try {
    const { currentPage, itemsPerPage } = await request.json();
    const token = verifyToken(request.headers.get("Authorization"));
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized", isSuccess: false },
        { status: 401 }
      );
    }
    const pendingOrders = await getPendingOrdersController(
      token?.userId,
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
